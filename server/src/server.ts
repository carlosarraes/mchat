import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import morgan from 'morgan'

const port = process.env.PORT || 3000
const app = express()
const server = createServer(app)

app.use(express.json())
app.use(morgan('dev'))

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

type data = {
  name: string
  message: string
}

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    io.emit('user_disconnected', socket.id)
  })

  socket.on('new_user', (username: string) => {
    const user = {
      id: socket.id,
      username,
    }
    console.log(`New user: ${username} `, user)
    io.emit('receive_users', user)
  })

  socket.on('send_message', (data: data) => {
    console.log(data)
    io.emit('receive_message', data)
  })
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
