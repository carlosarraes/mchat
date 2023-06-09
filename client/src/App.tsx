import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'
import type * as SocketIoClient from 'socket.io-client'
import ChatBox from './components/ChatBox'
import MsgBox from './components/MsgBox'
import UserBox from './components/UserBox'
import User from './components/User'
import Footer from './components/Footer'

const ENDPOINT = 'https://exchat-4wgfen3n5q-rj.a.run.app/'

type UserData = {
  username: string
  message: string
}

export type User = {
  id: string
  username: string
}

export type receivedData = {
  id: string
  username: string
  message: string
  timestamp: string
}

function App() {
  const [messages, setMessages] = useState<receivedData[]>([])
  const [data, setData] = useState<UserData>({
    username: '',
    message: '',
  })
  const [users, setUsers] = useState<User[]>([])
  const [userSaved, setUserSaved] = useState<boolean>(false)
  const [socket, setSocket] = useState<SocketIoClient.Socket | null>(null)
  const [, forceUpdate] = useState(false)

  const typingUsers = useRef<Set<string>>(new Set())
  const typingTimeouts = useRef(new Map())

  useEffect(() => {
    const getMsgs = async () => {
      const response = await fetch(`${ENDPOINT}messages`)
      const data = await response.json()

      setMessages(data)
    }
    setSocket(socketIOClient(ENDPOINT))

    getMsgs()
    return () => {
      if (socket) socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (message: receivedData) => {
        setMessages((prevMessages) => [...prevMessages, message])
      })

      socket.on('update_user_list', (user: User[]) => {
        setUsers(user)
      })

      socket.on('typing', (user: string) => {
        if (typingTimeouts.current.has(user)) {
          clearTimeout(typingTimeouts.current.get(user))
        }

        typingUsers.current.add(user)
        forceUpdate((prev) => !prev)

        const timeoutId = setTimeout(() => {
          typingUsers.current.delete(user)
          forceUpdate((prev) => !prev)
          typingTimeouts.current.delete(user)
        }, 1000)

        typingTimeouts.current.set(user, timeoutId)
      })
    }

    return () => {
      if (socket) {
        socket.off('receive_message')
        socket.off('update_user_list')
        socket.off('typing')
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
    if (socket && userSaved) socket.emit('typing', data.username)
  }

  const handleSaveUsername = () => {
    if (socket) socket.emit('new_user', data.username)
    setUserSaved(true)
  }

  return (
    <main className="bg-white flex flex-col w-11/12 sm:w-10/12 justify-center font-mono h-screen shadow-md">
      <section className="flex w-full h-full">
        <section className="flex flex-col w-full sm:w-3/4 h-full">
          <ChatBox messages={messages} />
          {!userSaved ? (
            <User
              username={data.username}
              handleChange={handleChange}
              handleSaveUsername={handleSaveUsername}
            />
          ) : (
            <MsgBox
              handleClick={handleClick}
              handleChange={handleChange}
              message={data.message}
              typingUsers={typingUsers.current}
            />
          )}
        </section>
        <UserBox users={users} />
      </section>
      <Footer />
    </main>
  )
}

export default App
