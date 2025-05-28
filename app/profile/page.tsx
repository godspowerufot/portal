"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"

export default function ProfilePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    )
  }

  if (!user) {
    return (
      <DashboardLayout>
        <p>User not authenticated</p>
      </DashboardLayout>
    )
  }

  const [firstName, ...lastNameArr] = user.fullName.split(" ")
  const lastName = lastNameArr.join(" ")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500">Manage your personal information and preferences</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr]">
          <Card className="border-black/10 h-fit">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.fullName} />
                  <AvatarFallback className="bg-gray-200 text-xl text-black">
                    {user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h3 className="font-medium">{user.fullName}</h3>
                  {user.role === "student" && user.studentId && (
                    <p className="text-sm text-gray-500">Student ID: {user.studentId}</p>
                  )}
                </div>
                <Button variant="outline" className="w-full border-darkGreen text-darkGreen hover:bg-darkGreen/10">
                  Change Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="personal" className="data-[state=active]:bg-darkGreen data-[state=active]:text-white">
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="academic" className="data-[state=active]:bg-darkGreen data-[state=active]:text-white">
                Academic Details
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-darkGreen data-[state=active]:text-white">
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="border-black/10">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={firstName} className="border-gray-300 focus-visible:ring-black" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={lastName} className="border-gray-300 focus-visible:ring-black" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter phone number" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter address" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <Button className="bg-darkGreen text-white hover:bg-darkGreen-light">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6">
              <Card className="border-black/10">
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>Your academic details and program information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="program">Program</Label>
                      <Input id="program" defaultValue={user.program || "N/A"} disabled className="border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year of Study</Label>
                      <Input id="year" defaultValue={user.year || "N/A"} disabled className="border-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="advisor">Academic Advisor</Label>
                    <Input id="advisor" defaultValue="Dr. Jane Smith" disabled className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpa">Current GPA</Label>
                    <Input id="gpa" defaultValue="3.7/4.0" disabled className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Completed Credits</Label>
                    <Input id="credits" defaultValue="45/120" disabled className="border-gray-300" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="border-black/10">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="border-gray-300 focus-visible:ring-black" />
                  </div>
                  <Button className="bg-darkGreen text-white hover:bg-darkGreen-light">Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
