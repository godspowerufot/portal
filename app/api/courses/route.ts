import { NextResponse, type NextRequest } from "next/server"
import { initDB, db } from "@/lib/lowdb"
import { getSessionFromRequest } from "@/lib/auth"
import type { Course } from "@/lib/types"
import { generateId } from "@/lib/data-store"
// GET all courses
export async function GET() {
  try {
    await initDB()
    const courses = db.data?.courses ?? []
    return NextResponse.json(courses)
  } catch (error) {
    console.error("GET /courses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST a new course
export async function POST(request: NextRequest) {
  try {
    await initDB()

    const session = await getSessionFromRequest(request)
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const courseData = await request.json()

    const newCourse: Course = {
      id: generateId(),
      ...courseData,
      students: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    db.data!.courses?.push(newCourse)
    await db.write()

    return NextResponse.json({ success: true, course: newCourse })
  } catch (error) {
    console.error("POST /courses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
