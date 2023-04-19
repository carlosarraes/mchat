import { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import type * as SocketIoClient from 'socket.io-client'
const ENDPOINT = 'http://localhost:3000/'
function App() {
  const [socket, setSocket] = useState<SocketIoClient.Socket | null>(null)
  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT))
    return () => {
      if (socket) socket.disconnect()
    }
  }, [])
  return (
    <div>
      <h1 className="text-4xl">Hello</h1>
    </div>
  );
}

export default App
