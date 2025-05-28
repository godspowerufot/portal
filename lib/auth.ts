import type { NextRequest } from "next/server"
import { SignJWT, jwtVerify } from "jose"
import type { AuthSession } from "./types"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function createToken(payload: AuthSession): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as AuthSession
  } catch (error) {
    return null
  }
}

export async function getSessionFromRequest(request: NextRequest): Promise<AuthSession | null> {
  const token = request.cookies.get("auth-token")?.value
  if (!token) return null

  return await verifyToken(token)
}
