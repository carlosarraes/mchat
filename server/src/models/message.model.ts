import { db } from '../db/db'
import { messages, NewMessage } from '../db/schema'

const getAll = async () => {
  const connection = await db
  const result = await connection.select().from(messages)

  return result
}

const insert = async (message: string, username: string, timestamp: Date) => {
  const connection = await db
  const newMessage: NewMessage = {
    message,
    username,
    timestamp,
  }

  await connection.insert(messages).values(newMessage)
}

export const messageModel = {
  getAll,
  insert,
}
