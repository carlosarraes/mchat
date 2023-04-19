import { Send } from 'lucide-react'

type MsgBoxProps = {
  handleClick: () => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  message: string
  typingUsers: Set<string>
}

const MsgBox = ({ handleClick, handleChange, message, typingUsers }: MsgBoxProps) => {
  const typingUsersArray = Array.from(typingUsers)
  const typingUsersNames = typingUsersArray.join(', ')

  return (
    <section className="flex flex-col gap-2 flex-shrink-0 p-2">
      {typingUsersArray.length > 0 && (
        <div className="text-xs text-gray-500">
          {typingUsersArray.length > 1
            ? `${typingUsersNames} are typing...`
            : `${typingUsersNames} is typing...`}
        </div>
      )}
      <div className="flex w-full gap-2">
        <input
          className="w-full h-10 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Type your message"
          name="message"
          value={message}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleClick()
          }}
        />
        <Send className="w-6 h-6 self-center text-gray-500 cursor-pointer" onClick={handleClick} />
      </div>
    </section>
  )
}

export default MsgBox
