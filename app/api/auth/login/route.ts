import { type NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/lowdb"
import { createToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    const db = await getDB()

    const user = db.data!.users.find(u => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const session = {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      studentId: user.studentId,
    }

    const token = await createToken(session)

    const response = NextResponse.json({
      success: true,
      user: session,
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
