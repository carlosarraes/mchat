import type { user } from '../App'

type UserBoxProps = {
  users: user[]
}

const UserBox = ({ users }: UserBoxProps) => {
  return (
    <section className="w-1/4 p-2">
      <h2 className="text-2xl font-bold">Users</h2>
      <ul className="flex flex-col gap-2">
        {users.map(({ id, username }) => (
          <li key={id} className="flex gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500 self-center" />
            <p>{username}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UserBox
