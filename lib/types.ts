export interface User {
  id: string
  email: string
  password: string
  fullName: string
  role: "student" | "admin"
  studentId?: string
  program?: string
  year?: string
  profilePicture?: string
  createdAt: Date
  updatedAt: Date
}

export interface Course {
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
  createdAt: Date
  updatedAt: Date
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  progress: number
  enrolledAt: Date
  status: "Active" | "Completed" | "Dropped"
  nextClass?: string
}

export interface Payment {
  id: string
  userId: string
  courseId: string
  amount: number
  status: "Paid" | "Pending" | "Failed"
  description: string
  invoiceId: string
  paymentDate: Date
  dueDate?: Date
}


export interface AuthSession {
  userId: string
  email: string
  fullName: string
  role: "student" | "admin"
  studentId?: string
}
