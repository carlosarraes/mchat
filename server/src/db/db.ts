import { drizzle } from 'drizzle-orm/planetscale-serverless'

let connection: any

async function connectToDatabase() {
  const { connect } = await import('@planetscale/database')
  connection = connect({
    host: process.env['DATABASE_HOST'],
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
  })
}

connectToDatabase()

const db = drizzle(connection)

export default db
