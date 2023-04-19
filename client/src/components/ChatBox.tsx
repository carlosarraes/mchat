import { receivedData } from '../App'

type ChatBoxProps = {
  messages: receivedData[]
}

const ChatBox = ({ messages }: ChatBoxProps) => {
  return (
    <section className="flex flex-col flex-grow p-2 overflow-auto">
      {messages.map(({ message, username }, index) => (
        <p key={index} className={`${index % 2 === 0 && 'bg-slate-100'} p-2`}>
          {`${username}: ${message}`}
        </p>
      ))}
    </section>
  )
}

export default ChatBox
