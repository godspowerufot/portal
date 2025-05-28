import { type NextRequest, NextResponse } from "next/server"
import { initDB, db } from "@/lib/lowdb"
import { getSessionFromRequest } from "@/lib/auth"
import { generateId } from "@/lib/data-store"
import type { Enrollment } from "@/lib/types"

// GET: Fetch user enrollments
export async function GET(request: NextRequest) {
  try {
    await initDB()

    const session = await getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userEnrollments = db.data?.enrollments?.filter(
      (e) => e.userId === session.userId
    ) ?? []

    const enriched = userEnrollments.map((enrollment) => {
      const course = db.data?.courses?.find((c) => c.id === enrollment.courseId)
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
    await initDB()

    const session = await getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const enrollment = await request.json()

    // Validate that the required keys are present (optional but recommended)
    const requiredKeys = ["id", "userId", "courseId", "enrollmentDate", "status", "course"]
    const missingKeys = requiredKeys.filter((key) => !(key in enrollment))
    if (missingKeys.length > 0) {
      return NextResponse.json({ error: `Missing keys: ${missingKeys.join(", ")}` }, { status: 400 })
    }

    // Optional: Check if already enrolled
    const already = db.data?.enrollments?.find(
      (e) => e.userId === enrollment.userId && e.courseId === enrollment.courseId
    )
    if (already) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 })
    }

    db.data!.enrollments.push(enrollment)

    // Optional: increment course student count in DB if course exists
    const course = db.data?.courses?.find((c) => c.id === enrollment.courseId)
    if (course) {
      course.students += 1
    }

    await db.write()

    return NextResponse.json({ success: true, enrollment })
  } catch (error) {
    console.error("POST /enrollments error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

