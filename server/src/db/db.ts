import { drizzle } from 'drizzle-orm/planetscale-serverless'
import dotenv from 'dotenv'
dotenv.config()

const db = (async () => {
  const { connect } = await import('@planetscale/database')
  const connection = connect({
    host: process.env['DATABASE_HOST'],
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
  })

  return drizzle(connection, { logger: true })
})()

export { db }
