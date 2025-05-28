"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { BookOpen, Clock, GraduationCap, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

interface EnrollmentWithCourse {
  id: string
  userId: string
  courseId: string
  progress: number
  enrolledAt: string
  status: string
  nextClass?: string
  course?: {
    id: string
    title: string
    instructor: string
    credits: number
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch("/api/enrollments")
        if (response.ok) {
          const data = await response.json()
          setEnrollments(data)
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [])

  const upcomingEvents = [
    { id: 1, title: "Midterm Exam - Computer Science", date: "May 25, 2023", time: "10:00 AM" },
    { id: 2, title: "Group Project Submission", date: "May 28, 2023", time: "11:59 PM" },
    { id: 3, title: "Career Fair", date: "June 2, 2023", time: "9:00 AM - 4:00 PM" },
  ]

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">Loading...</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold  text-black tracking-tight">Welcome, {user?.fullName?.split(" ")[0] || "Student"}</h1>
            <p className="text-gray-500">Here's an overview of your academic progress</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-black/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Enrolled Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-darkGreen" />
                  <span className="text-2xl font-bold">{enrollments.length}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-black/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Completed Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-darkGreen" />
                  <span className="text-2xl font-bold">
                    {enrollments.reduce((total, item) => total + (item.course?.credits || 0), 0)}/120
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-black/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">GPA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">3.7</span>
                  <span className="ml-1 text-sm text-gray-500">/4.0</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-black/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-darkGreen" />
                  <span className="text-2xl font-bold">92%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Enrolled Courses</CardTitle>
                <CardDescription>Your current course progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {enrollments.length > 0 ? (
                    enrollments.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{item.course?.title}</h3>
                            <p className="text-xs text-gray-500">{item.course?.instructor}</p>
                          </div>
                          <span className="text-sm font-medium">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2 bg-gray-100 [&>div]:bg-darkGreen" />
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          Next class: {item.nextClass || "TBD"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No enrolled courses yet</p>
                  )}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 w-full border-darkGreen text-darkGreen hover:bg-darkGreen/10"
                >
                  <Link href="/courses">View All Courses</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled events and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <Calendar className="h-5 w-5 text-darkGreen" />
                      </div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {event.date} • {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 w-full border-darkGreen text-darkGreen hover:bg-darkGreen/10"
                >
                  <Link href="/calendar">View Calendar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
