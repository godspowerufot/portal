// lib/data-store.ts
import { readBin, writeBin } from './jsonbin'
import type { User, Course, Enrollment, Payment } from './types'

type Data = {
  users: User[]
  courses: Course[]
  enrollments: Enrollment[]
  payments: Payment[]
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// Users
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const data = await readBin()
  return data.users.find((user: User) => user.email === email)
}

export const findUserById = async (id: string): Promise<User | undefined> => {
  const data = await readBin()
  return data.users.find((user: User) => user.id === id)
}

export const addUser = async (user: User): Promise<void> => {
  const data = await readBin()
  data.users.push(user)
  await writeBin(data)
}

// Courses
export const findCourseById = async (id: string): Promise<Course | undefined> => {
  const data = await readBin()
  return data.courses.find((course: Course) => course.id === id)
}

export const addCourse = async (course: Course): Promise<void> => {
  const data = await readBin()
  data.courses.push(course)
  await writeBin(data)
}

// Enrollments
export const getUserEnrollments = async (userId: string): Promise<Enrollment[]> => {
  const data = await readBin()
  return data.enrollments.filter((enrollment: Enrollment) => enrollment.userId === userId)
}

export const addEnrollment = async (enrollment: Enrollment): Promise<void> => {
  const data = await readBin()
  data.enrollments.push(enrollment)
  await writeBin(data)
}

// Payments
export const getUserPayments = async (userId: string): Promise<Payment[]> => {
  const data = await readBin()
  return data.payments.filter((payment: Payment) => payment.userId === userId)
}

export const savePayment = async (payment: Payment): Promise<void> => {
  const data = await readBin()
  data.payments.push(payment)
  await writeBin(data)
}
