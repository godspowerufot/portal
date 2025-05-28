import { type NextRequest, NextResponse } from "next/server"
import { generateId, addUser, findUserByEmail } from "@/lib/data-store"
import { createToken } from "@/lib/auth"
import type { User } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, studentId, program, year } = await request.json()

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const newUser: User = {
      id: generateId(),
      email,
      password, // 🔒 Remember to hash in production!
      fullName,
      role: "student",
      studentId: studentId || `ST${Date.now()}`,
      program: program || "",
      year: year || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await addUser(newUser)

    const session = {
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      studentId: newUser.studentId,
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
