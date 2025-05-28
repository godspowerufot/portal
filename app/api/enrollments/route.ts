import { type NextRequest, NextResponse } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"
import { readBin, writeBin } from "@/lib/jsonbin"
import { generateId } from "@/lib/data-store"
import type { Enrollment } from "@/lib/types"

// GET: Fetch user enrollments
export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await readBin()
    const userEnrollments = data.enrollments?.filter(
      (e: Enrollment) => e.userId === session.userId
    ) ?? []

    const enriched = userEnrollments.map((enrollment: Enrollment) => {
      const course = data.courses?.find((c:any) => c.id === enrollment.courseId)
      return {
        ...enrollment,
        course,
      }
    })

    return NextResponse.json(enriched)
  } catch (error) {
    console.error("GET /enrollments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST: Enroll a user in a course
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const incoming = await request.json()
    const data = await readBin()

    const requiredKeys = ["courseId", "enrollmentDate", "status"]
    const missing = requiredKeys.filter(k => !(k in incoming))
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing keys: ${missing.join(", ")}` }, { status: 400 })
    }

    const already = data.enrollments?.find(
      (e: Enrollment) => e.userId === session.userId && e.courseId === incoming.courseId
    )
    if (already) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 })
    }

    const enrollment: Enrollment = {
      id: generateId(),
      userId: session.userId,
      courseId: incoming.courseId,
      progress: 0,
      enrolledAt: new Date(incoming.enrollmentDate),
      status: incoming.status,
    }

    data.enrollments.push(enrollment)

    // Optional: increment course student count
    const course = data.courses.find((c: any) => c.id === enrollment.courseId)
    if (course) {
      course.students = (course.students || 0) + 1
    }

    await writeBin(data)

    return NextResponse.json({ success: true, enrollment })
  } catch (error) {
    console.error("POST /enrollments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
