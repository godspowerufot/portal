// lib/jsonbin.ts
import axios from 'axios'

const API_KEY = "$2a$10$7w4e6CQ/gFqzZu2P1Gxqq.Q4MzytdeUGY3En04B6ATOlD.8XALXIm"
const BIN_ID = "683770398561e97a501cc1cb"
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`

const headers = {
  'X-Master-Key': API_KEY,
  'Content-Type': 'application/json'
}

export async function readBin() {
  const res = await axios.get(BASE_URL, { headers })
  return res.data.record
}

export async function writeBin(data: any) {
  await axios.put(BASE_URL, data, { headers })
}
