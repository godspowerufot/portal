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
import { Textarea } from "@/components/ui/textarea"
import { Search, MoreHorizontal, Plus, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Course {
  id: string
  title: string
  instructor: string
  credits: number
  price: number
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  description: string
  status: "Active" | "Inactive"
  students: number
  createdAt: string
  updatedAt: string
}

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    instructor: "",
    credits: 0,
    price: 0,
    level: "Beginner",
    duration: "",
    description: "",
    status: "Active",
  })

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/courses")
      const data = await res.json()
      setCourses(data)
    } catch (err) {
      console.error("Failed to fetch courses", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleAddCourse = async () => {
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const result = await res.json()
      if (res.ok) {
        await fetchCourses()
        alert("Course added successfully!")
      } else {
        alert(result.error || "Failed to add course.")
      }
    } catch (err) {
      console.error("Add course failed:", err)
      alert("Error occurred while adding the course.")
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-gray-500">View and manage all courses</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full pl-8 border-gray-300 focus-visible:ring-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-darkGreen text-white hover:bg-darkGreen-light">
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>Enter course details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="id">Course ID</Label>
                    <Input id="id" value={formData.id} onChange={handleFormChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input id="credits" type="number" value={formData.credits} onChange={handleFormChange} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" value={formData.title} onChange={handleFormChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input id="instructor" value={formData.instructor} onChange={handleFormChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price (N)</Label>
                    <Input id="price" type="number" value={formData.price} onChange={handleFormChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" value={formData.duration} onChange={handleFormChange} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={handleFormChange} />
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-darkGreen text-white hover:bg-darkGreen-light" onClick={handleAddCourse}>
                  Add Course
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-black/10">
          <CardHeader>
            <CardTitle>All Courses</CardTitle>
            <CardDescription>Manage course offerings and enrollment</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading courses...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.id}</TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>N{course.price}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            course.status === "Active"
                              ? "border-darkGreen bg-darkGreen/10 text-darkGreen"
                              : "border-red-600 bg-red-50 text-red-600"
                          }`}
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
