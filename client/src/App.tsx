import { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import type * as SocketIoClient from 'socket.io-client'
import ChatBox from './components/ChatBox'
import MsgBox from './components/MsgBox'
import User from './components/User'

const ENDPOINT = 'http://localhost:3000/'

export type user = {
  id: string
  username: string
}

export type receivedData = {
  id: string
  username: string
  message: string
  timestamp: number
}

function App() {
  const [messages, setMessages] = useState<receivedData[]>([])
  const [data, setData] = useState<userData>({
    username: '',
    message: '',
  })
  const [username, setUsername] = useState<string>('')
  const [socket, setSocket] = useState<SocketIoClient.Socket | null>(null)

  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT))

    return () => {
      if (socket) socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (message: receivedData) => {
        setMessages((prevMessages) => [...prevMessages, message])
      })

      socket.on('receive_users', (user: user) => {
        setUsers((prevUsers) => [...prevUsers, user])
      })
    }

    return () => {
      if (socket) {
        socket.off('receive_message')
        socket.off('receive_users')
      }
    }
  }, [socket])

  const handleClick = () => {
    if (socket) socket.emit('send_message', data)
    setData((prevData) => ({ ...prevData, message: '' }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSaveUsername = () => {
    setUsername(data.username)
    if (socket) socket.emit('new_user', data.username)
  }

  return (
    <main className="bg-white flex w-8/12 justify-center font-mono h-screen shadow-md">
      <section className="flex flex-col w-3/4 h-full">
        <ChatBox messages={messages} />
        {!username ? (
          <User
            username={data.username}
            handleChange={handleChange}
            handleSaveUsername={handleSaveUsername}
          />
        ) : (
          <MsgBox handleClick={handleClick} handleChange={handleChange} message={data.message} />
        )}
      </section>
      <UserBox users={users} />
    </main>
  )
}

export default App
