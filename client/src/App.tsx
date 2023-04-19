import { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import type * as SocketIoClient from 'socket.io-client'
import ChatBox from './components/ChatBox'
const ENDPOINT = 'http://localhost:3000/'
export type receivedData = {
  id: string
  username: string
  message: string
  timestamp: number
}
function App() {
  const [messages, setMessages] = useState<receivedData[]>([])
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
    return () => {
      if (socket) {
        socket.off('receive_message')
      }
    }
  }, [socket])
  return (
    <main className="bg-white flex w-8/12 justify-center font-mono h-screen shadow-md">
      <section className="flex flex-col w-3/4 h-full">
        <ChatBox messages={messages} />
      </section>
    </main>
  )
}

export default App
