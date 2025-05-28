"use client"  // Ensure this is client component (if using Next.js app router)

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
  // add other fields if needed
}

export default function AdminDashboardPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/admin/students")
        if (!res.ok) {
          throw new Error("Failed to fetch students")
        }
        const data: Student[] = await res.json()
        setStudents(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of the student portal system</p>
        </div>

        {/* ... Cards section unchanged ... */}

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
                {loading ? (
                  <p>Loading students...</p>
                ) : error ? (
                  <p className="text-red-500">Error: {error}</p>
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

          {/* Payments tab remains unchanged */}
          {/* ... */}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
