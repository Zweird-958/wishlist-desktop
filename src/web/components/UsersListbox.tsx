import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react"
import { Key } from "react"
import Color from "../types/Color"
import User from "../types/User"
import Loading from "./Loading"

type Props = {
  users: User[]
  isFetching: boolean
  title: string
  action: (key: Key) => void
  listboxColor?: Color
  endContent?: React.ReactNode
}

const UsersListbox = (props: Props) => {
  const { users, isFetching, title, action, listboxColor, endContent } = props

  return (
    <div className="w-full max-w-[280px] border-small px-1 py-2 rounded-small border-default-200">
      <Listbox aria-label="users" onAction={action}>
        <ListboxSection title={title}>
          {isFetching ? (
            <ListboxItem key={"loader"}>
              <Loading />
            </ListboxItem>
          ) : (
            users.map((user) => (
              <ListboxItem
                key={user.id}
                color={listboxColor}
                endContent={endContent}
              >
                {user.username}
              </ListboxItem>
            ))
          )}
        </ListboxSection>
      </Listbox>
    </div>
  )
}

export default UsersListbox
