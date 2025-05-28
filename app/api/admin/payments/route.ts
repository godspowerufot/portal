// File: /pages/api/admin/payments.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { initDB } from "@/lib/lowdb"
import { dbInstance } from "@/lib/data-store"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    await initDB()
    const payments = dbInstance.data?.payments || []
    return res.status(200).json(payments)
  } catch (error) {
    console.error("Error fetching payments:", error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
