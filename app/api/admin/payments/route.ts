// File: /app/api/admin/payments/route.ts
import { NextResponse } from "next/server"
import { readBin } from "@/lib/jsonbin"

export async function GET() {
  try {
    const data = await readBin()
    const payments = data.payments || []
    return NextResponse.json(payments)
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
