import { useEffect, useRef } from 'react'
import { receivedData } from '../App'

type ChatBoxProps = {
  messages: receivedData[]
}

const ChatBox = ({ messages }: ChatBoxProps) => {
  const chatBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
  }, [messages])

  return (
    <section ref={chatBoxRef} className="flex flex-col flex-grow p-2 overflow-auto">
      {messages.map(({ message, username }, index) => (
        <p key={index} className={`${index % 2 === 0 && 'bg-slate-100'} p-2`}>
          {`${username}: ${message}`}
        </p>
      ))}
    </section>
  )
}

export default ChatBox
