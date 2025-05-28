import { NextResponse, type NextRequest } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"
import { generateId } from "@/lib/data-store"
import { readBin, writeBin } from "@/lib/jsonbin"
import type { Course } from "@/lib/types"

// GET all courses
export async function GET() {
  try {
    const data = await readBin()
    const courses: Course[] = data.courses ?? []
    return NextResponse.json(courses)
  } catch (error) {
    console.error("GET /courses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST a new course
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const courseData = await request.json()
    const data = await readBin()

    const newCourse: Course = {
      id: generateId(),
      ...courseData,
      students: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    data.courses.push(newCourse)
    await writeBin(data)

    return NextResponse.json({ success: true, course: newCourse })
  } catch (error) {
    console.error("POST /courses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
