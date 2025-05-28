// lib/data-store.ts
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import type { User, Course, Enrollment, Payment } from './types'
import { initDB } from './lowdb'

// Define the shape of your database
type Data = {
  users: User[]
  courses: Course[]
  enrollments: Enrollment[]
  payments: Payment[]
}

const adapter = new JSONFile<Data>('db.json')
const db = new Low<Data>(adapter, { users: [], courses: [], enrollments: [], payments: [] })
db.read()
db.data ||= { users: [], courses: [], enrollments: [], payments: [] }

// Helper Functions
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  await db.read()
  return db.data?.users.find((user) => user.email === email)
}

export const findUserById = async (id: string): Promise<User | undefined> => {
  await db.read()
  return db.data?.users.find((user) => user.id === id)
}

export const findCourseById = async (id: string): Promise<Course | undefined> => {
  await db.read()
  return db.data?.courses.find((course) => course.id === id)
}

export const getUserEnrollments = async (userId: string): Promise<Enrollment[]> => {
  await db.read()
  return db.data?.enrollments.filter((enrollment) => enrollment.userId === userId) || []
}


export const addUser = async (user: User): Promise<void> => {
  await db.read()
  db.data?.users.push(user)
  await db.write()
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const addCourse = async (course: Course): Promise<void> => {
  await db.read()
  db.data?.courses.push(course)
  await db.write()
}

export const addEnrollment = async (enrollment: Enrollment): Promise<void> => {
  await db.read()
  db.data?.enrollments.push(enrollment)
  await db.write()
}


// Always call initDB() before any DB access
export async function getUserPayments(userId: string): Promise<Payment[]> {
  await initDB()
  return db.data!.payments.filter(p => p.userId === userId)
}

export async function savePayment(payment: any): Promise<void> {
  await initDB()
  db.data!.payments.push(payment)
  await db.write()
}





// Use this for tests or seed scripts
export const dbInstance = db
