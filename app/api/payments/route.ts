import { type NextRequest, NextResponse } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"
import { getUserPayments, savePayment } from "@/lib/data-store"

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const payments = await getUserPayments(session.userId)
    return NextResponse.json(payments)
  } catch (error) {
    console.error("GET /api/payment error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { txRef, amount, description } = await request.json()

const newPayment = {
  id: crypto.randomUUID(),
  userId: session.userId,
  courseId: "",
  amount: Number(amount),
  status: "Pending" as const,
  description,
  invoiceId: txRef,
  paymentDate: new Date().toISOString(),
}



    await savePayment(newPayment)
    return NextResponse.json({ success: true, payment: newPayment })

  } catch (error) {
    console.error("POST /api/payment error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

