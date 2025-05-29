"use client"

import React, { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, DollarSign, Users } from "lucide-react"
import Link from "next/link"

interface Student {
  id: string
  fullName: string
  email: string
  createdAt: string
}

interface Payment {
  paymentDate: string | number | Date
  id: string
  userId: string
  courseId: string
  amount: number
  createdAt: string
   invoiceId:string
   description: string
  reference: string
  courseTitle?: string // optional enrichment
}

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loadingStudents, setLoadingStudents] = useState(true)
  const [loadingPayments, setLoadingPayments] = useState(true)
  const [studentError, setStudentError] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/admin/students")
        if (!res.ok) throw new Error("Failed to fetch students")
        const data: Student[] = await res.json()
        setStudents(data)
      } catch (err) {
        setStudentError((err as Error).message)
      } finally {
        setLoadingStudents(false)
      }
    }

  async function fetchPayments() {
  try {
    const res = await fetch("/api/admin/payments", {
      method: "GET",
    })
    if (!res.ok) throw new Error("Failed to fetch payments")
    const data: Payment[] = await res.json()
    setPayments(data)
  } catch (err) {
    setPaymentError((err as Error).message)
  } finally {
    setLoadingPayments(false)
  }
}

    fetchStudents()
    fetchPayments()
  }, [])

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of the student portal system</p>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="students" className="data-[state=active]:bg-darkGreen data-[state=active]:text-white">
              Recent Students
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-darkGreen data-[state=active]:text-white">
              Recent Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Recent Student Registrations</CardTitle>
                <CardDescription>Students who recently joined the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingStudents ? (
                  <p>Loading students...</p>
                ) : studentError ? (
                  <p className="text-red-500">Error: {studentError}</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map(student => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.fullName}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" className="text-darkGreen hover:bg-darkGreen/10">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="mt-4 flex justify-end">
                  <Button asChild variant="outline" className="border-darkGreen text-darkGreen hover:bg-darkGreen/10">
                    <Link href="/admin/students">View All Students</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Track form purchases and course payments</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingPayments ? (
                  <p>Loading payments...</p>
                ) : paymentError ? (
                  <p className="text-red-500">Error: {paymentError}</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map(payment => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.invoiceId}</TableCell>
                          <TableCell>{payment.userId}</TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell>₦{payment.amount?.toLocaleString()}</TableCell>
                          <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
