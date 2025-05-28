import { type NextRequest, NextResponse } from "next/server"
import { generateId } from "@/lib/data-store"
import { createToken } from "@/lib/auth"
import { getDB } from "@/lib/lowdb"
import type { User } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, studentId, program, year } = await request.json()

    const db = await getDB()

    const existingUser = db.data!.users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const newUser: User = {
      id: generateId(),
      email,
      password, // 🔒 Don't forget to hash in production!
      fullName,
      role: "student",
      studentId: studentId || `ST${Date.now()}`,
      program: program || "",
      year: year || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    db.data!.users.push(newUser)
    await db.write()

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
