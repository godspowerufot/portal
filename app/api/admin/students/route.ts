import { NextResponse, type NextRequest } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"
import { readBin } from "@/lib/jsonbin"

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)

    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await readBin()
    const students = data.users?.filter((user: any) => user.role === "student") || []

    return NextResponse.json(students)
  } catch (error) {
    console.error("GET /admin/students error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
