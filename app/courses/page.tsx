"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"

interface Course {
  id: string
  title: string
  instructor: string
  credits: number
  price: number
  level: string
  duration: string
  description: string
  status: string
  students: number
}

interface EnrollmentWithCourse {
  id: string
  userId: string
  courseId: string
  progress: number
  enrolledAt: string
  status: string
  nextClass?: string
  course?: Course
}

export default function CoursesPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, enrollmentsResponse] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/enrollments"),
        ])

        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json()
          setCourses(coursesData)
        }

        if (enrollmentsResponse.ok) {
          const enrollmentsData = await enrollmentsResponse.json()
          setEnrollments(enrollmentsData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleEnroll = async (courseId: string) => {
    try {
      const course = courses.find((c) => c.id === courseId)
      if (!course || !user) return

      const enrollmentPayload = {
        id: course.id,
        userId: user.id,
        courseId: course.id,
        enrollmentDate: new Date().toISOString(),
        status: "Enrolled",
        course,
      }

      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentPayload),
      })

      if (response.ok) {
        const enrollmentsResponse = await fetch("/api/enrollments")
        if (enrollmentsResponse.ok) {
          const enrollmentsData = await enrollmentsResponse.json()
          setEnrollments(enrollmentsData)
        }
      } else {
        const error = await response.json()
        alert(error.error || "Failed to enroll")
      }
    } catch (error) {
      console.error("Error enrolling:", error)
      alert("Failed to enroll")
    }
  }

  const handleBuyForm = (course: Course) => {
    if (!user) return alert("You need to be logged in to buy the form.")

    const amount = 5000 * 100 // Convert to Kobo
    const email = user.email || "user@example.com"
    const description = `Form purchase for course: ${course.title}`

    const handler = window.PaystackPop?.setup({
      key: "pk_test_67b30593c8f7f50f4dd367f564310a1f23eb37a1",
      email,
      amount,
      ref: `${Date.now()}`,
      callback: function (response: any) {
        fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            txRef: response.reference,
            amount: 5000,
            description,
            courseId: course.id,
            userId: user.id,
          }),
        }).then(() => window.location.reload())
      },
      onClose: function () {
        alert("Transaction cancelled")
      },
    })

    handler.openIframe()
  }

  const enrolledCourseIds = enrollments.map((e) => e.courseId)
  const availableCourses = courses.filter((course) => !enrolledCourseIds.includes(course.id))

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
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-gray-500">Browse and manage your courses</p>
          </div>

          <Tabs defaultValue="enrolled" className="space-y-6">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="enrolled" className="data-[state=active]:bg-darkGreen data-[state=active]:text-white">
                Enrolled Courses
              </TabsTrigger>
              <TabsTrigger
                value="available"
                className="data-[state=active]:bg-darkGreen data-[state=active]:text-white"
              >
                Available Courses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="border-black/10">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="line-clamp-1">{enrollment.course?.title}</CardTitle>
                        <Badge variant="outline" className="border-darkGreen bg-white text-darkGreen">
                          {enrollment.status}
                        </Badge>
                      </div>
                      <CardDescription>{enrollment.course?.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{enrollment.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100">
                          <div className="h-full bg-darkGreen" style={{ width: `${enrollment.progress}%` }} />
                        </div>
                        <p className="text-xs text-gray-500">Next class: {enrollment.nextClass || "TBD"}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-darkGreen text-white hover:bg-darkGreen-light">
                        Continue Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                {enrollments.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No enrolled courses yet. Browse available courses to get started!
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="available" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {availableCourses.map((course) => (
                  <Card key={course.id} className="border-black/10">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                        <Badge variant="outline" className="border-black bg-white text-black">
                          {course.level}
                        </Badge>
                      </div>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm">{course.description}</p>
                        <div className="flex justify-between text-sm">
                          <span>Credits: {course.credits}</span>
                          <span>Duration: {course.duration}</span>
                        </div>
                        <div className="text-lg font-bold text-darkGreen">Form Price: ₦5000</div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button
                        className="flex-1 bg-darkGreen text-white hover:bg-darkGreen-light"
                        onClick={() => handleEnroll(course.id)}
                      >
                        Enroll Now
                      </Button>
                      <Button
                        className="flex-1 border-darkGreen text-darkGreen hover:bg-darkGreen/10"
                        variant="outline"
                        onClick={() => handleBuyForm(course)}
                      >
                        Buy Form
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                {availableCourses.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    You are enrolled in all available courses!
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
