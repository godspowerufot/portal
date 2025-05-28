"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, CreditCard, Home, LogOut, Menu, Settings, User, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth-context"

interface DashboardLayoutProps {
  children: React.ReactNode
  isAdmin?: boolean
}

export function DashboardLayout({ children, isAdmin = false }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const studentNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/payments", label: "Payments", icon: CreditCard },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  const navItems = isAdmin ? adminNavItems : studentNavItems

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden w-64 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <Link href="/" className="text-xl font-bold text-black">
            School of Nursing Sciences
          </Link>
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-darkGreen/10 text-darkGreen" : "text-gray-600 hover:bg-gray-50 hover:text-darkGreen"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-darkGreen" : ""}`} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-6">
            <div className="flex items-center gap-3 rounded-md px-3 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-gray-200 text-black">
                  {user?.fullName?.charAt(0) || (isAdmin ? "AD" : "ST")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black">
                  {user?.fullName || (isAdmin ? "Admin User" : "Student")}
                </span>
                <span className="text-xs text-gray-500">
                  {isAdmin ? "Administrator" : `Student ID: ${user?.studentId || "ST12345"}`}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              className="mt-2 w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-darkGreen"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute left-4 top-3 z-50">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b border-gray-200 px-6">
            <Link href="/" className="text-xl font-bold text-black">
              Student Portal
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-darkGreen/10 text-darkGreen"
                        : "text-gray-600 hover:bg-gray-50 hover:text-darkGreen"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-darkGreen" : ""}`} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="mt-6">
              <div className="flex items-center gap-3 rounded-md px-3 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-gray-200 text-black">
                    {user?.fullName?.charAt(0) || (isAdmin ? "AD" : "ST")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black">
                    {user?.fullName || (isAdmin ? "Admin User" : "Student")}
                  </span>
                  <span className="text-xs text-gray-500">
                    {isAdmin ? "Administrator" : `Student ID: ${user?.studentId || "ST12345"}`}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                className="mt-2 w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-darkGreen"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleLogout()
                }}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b border-gray-200 bg-white px-6 md:px-8">
          <div className="ml-auto flex items-center gap-4">
            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-gray-200 text-black">
                {user?.fullName?.charAt(0) || (isAdmin ? "AD" : "ST")}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
