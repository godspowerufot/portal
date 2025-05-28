// lib/lowdb.ts or wherever you define DB logic
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import type { Course, User, Enrollment, Payment } from './types'

type Data = {
  users: User[]
  courses: Course[]
  enrollments: Enrollment[]
  payments: Payment[]
}

// Path to your JSON file
const file = '/data/db.json' // instead of process.cwd()

// JSON file adapter
const adapter = new JSONFile<Data>(file)

// Provide default structure when initializing
export const db = new Low<Data>(adapter, {
  users: [],
  courses: [],
  enrollments: [],
  payments: [],
})

export async function initDB() {
  await db.read()
  db.data ||= {
    users: [],
    courses: [],
    enrollments: [],
    payments: [],
  }
  await db.write()
}

export async function getDB() {
  await initDB()
  return db
}

