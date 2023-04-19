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
      {messages.map(({ message, username, timestamp }, index) => (
        <p key={index} className={`${index % 2 === 0 && 'bg-slate-100'} p-2 flex justify-between `}>
          <span className="self-center">{`${username}: ${message}`}</span>
          <span className="text-xs self-center">[{`${timestamp.split(' ')[1]}`}]</span>
        </p>
      ))}
    </section>
  )
}

export default ChatBox
