import { type NextRequest, NextResponse } from "next/server"
import { readBin } from "@/lib/jsonbin"
import { createToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const data = await readBin()
    const user = data.users?.find((u: any) => u.email === email)

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
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error("POST /auth/login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
