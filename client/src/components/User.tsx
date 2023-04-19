type UserProps = {
  username: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSaveUsername: () => void
}

const User = ({ username, handleChange, handleSaveUsername }: UserProps) => {
  return (
    <section className="flex gap-2 flex-shrink-0 justify-center p-2">
      <input
        className="w-1/2 h-10 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Type your username here..."
        value={username}
        name="username"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSaveUsername()
        }}
      />
      <button
        className="w-1/4 h-10 px-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        onClick={handleSaveUsername}
        type="button"
      >
        Save User
      </button>
    </section>
  )
}

export default User
