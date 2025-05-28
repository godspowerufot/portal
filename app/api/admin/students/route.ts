// File: /app/api/admin/students/route.ts (or /pages/api/admin/students.ts depending on your Next.js setup)

import { NextResponse, NextRequest } from "next/server"
import { getDB } from "@/lib/lowdb"
import { getSessionFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDB()
    const students = db.data!.users.filter(user => user.role === "student")

    return NextResponse.json(students)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
