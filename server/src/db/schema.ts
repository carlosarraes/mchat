import { InferModel } from 'drizzle-orm'
import { mysqlTable, serial, text, varchar, timestamp } from 'drizzle-orm/mysql-core'

export const messages = mysqlTable('messages', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 256 }),
  message: text('message'),
  timestamp: timestamp('timestamp'),
})

export type NewMessage = InferModel<typeof messages, 'insert'>
