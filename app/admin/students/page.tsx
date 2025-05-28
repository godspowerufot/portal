"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Search, MoreHorizontal, Plus, Ban, Trash2, UserPlus } from "lucide-react"

interface Student {
  id: string
  fullName: string
  email: string
  name: string
  createdAt: string
  program: string
  year: string
  status: string
}

export default function AdminStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/admin/students")
        if (!res.ok) throw new Error("Failed to fetch students")
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

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-gray-500">View and manage all registered students</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-full pl-8 border-gray-300 focus-visible:ring-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {/* Generate Code Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-darkGreen text-white hover:bg-darkGreen-light">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Generate Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Student Registration Code</DialogTitle>
                  <DialogDescription>Create a unique code for new student registration.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="program">Program</Label>
                    <Input id="program" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" type="date" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="usageLimit">Usage Limit</Label>
                    <Input id="usageLimit" type="number" defaultValue="1" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="bg-darkGreen text-white hover:bg-darkGreen-light">Generate Code</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Add Student Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-darkGreen text-white hover:bg-darkGreen-light">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Manually add a new student to the system.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="program">Program</Label>
                    <Input id="program" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year of Study</Label>
                    <Input id="year" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="bg-darkGreen text-white hover:bg-darkGreen-light">Add Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Error and Loading states */}
        {loading && <p>Loading students...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        <Card className="border-black/10">
          <CardHeader>
            <CardTitle>All Students</CardTitle>
            <CardDescription>Manage student accounts and access</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 && !loading && <TableRow><TableCell colSpan={7} className="text-center py-4">No students found.</TableCell></TableRow>}

                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          student.status === "Active"
                            ? "bg-darkGreen/20 text-darkGreen"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Student</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="mr-2 h-4 w-4" />
                            Ban Student
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
