import { Send } from 'lucide-react'

type MsgBoxProps = {
  handleClick: () => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  message: string
}

const MsgBox = ({ handleClick, handleChange, message }: MsgBoxProps) => {
  return (
    <section className="flex gap-2 flex-shrink-0 p-2">
      <input
        className="w-full h-10 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Type your message here..."
        name="message"
        value={message}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleClick()
        }}
      />
      <Send className="w-6 h-6 self-center text-gray-500 cursor-pointer" onClick={handleClick} />
    </section>
  )
}

export default MsgBox
