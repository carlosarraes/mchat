import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import morgan from 'morgan'
import dayjs from 'dayjs'
import dotenv from 'dotenv'
import cors from 'cors'
import { messageModel } from './models/message.model'
import { messageRoutes } from './routes'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

dotenv.config()
const port = process.env.PORT || 3000
const app = express()
const server = createServer(app)

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/messages', messageRoutes)

const io = new Server(server, {
  cors: {
    origin: 'https://mchat-ca.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

type Data = {
  username: string
  message: string
  timestamp: string
}

type User = {
  id: string
  username: string
}

const connectedUsers: Set<User> = new Set()

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)

    for (const user of connectedUsers) {
      if (user.id === socket.id) {
        connectedUsers.delete(user)
        break
      }
    }

    io.emit('update_user_list', Array.from(connectedUsers))
  })

  socket.on('new_user', (username: string) => {
    const user = {
      id: socket.id,
      username,
    }
    connectedUsers.add(user)
    console.log(`New user: ${username} `, user)

    io.emit('update_user_list', Array.from(connectedUsers))
  })

  socket.on('typing', (username: string) => {
    socket.broadcast.emit('typing', username)
  })

  socket.on('send_message', (data: Data) => {
    const timestamp = dayjs().tz('America/Sao_Paulo')
    data.timestamp = timestamp.format('DD/MM HH:mm')

    messageModel.insert(data.message, data.username, timestamp.toDate())

    io.emit('receive_message', data)
  })
})

server.listen(port, () => {
  console.log(`Server running at PORT: ${port}`)
})
