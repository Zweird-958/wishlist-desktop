import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import api from "../services/api"
import { useUsersSharedWithStore } from "../stores/usersSharedWith"
import User from "../types/User"
import useHandleErrors from "./useHandleErrors"
import useSession from "./useSession"

const useUsersSharedWith = () => {
  const { usersSharedWith, setUsersSharedWith, ...otherProps } =
    useUsersSharedWithStore()

  const { handleError } = useHandleErrors()
  const { session } = useSession()

  const { data, isFetching } = useQuery({
    queryKey: ["wishShared", session],
    queryFn: () => {
      return api.get<User[]>("/share/users")
    },
    select: (data) => data.result,
    enabled: usersSharedWith.length === 0 && session !== null,
    onError: handleError,
  })

  // const previousValue = useRef(usersSharedWith)

  // if (previousValue.current !== data && data && session) {
  //   previousValue.current = data
  //   setUsersSharedWith(data)
  // }

  useEffect(() => {
    if (usersSharedWith.length === 0 && data && session) {
      setUsersSharedWith(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setUsersSharedWith, usersSharedWith.length])

  return {
    isFetching,
    usersSharedWith,
    setUsersSharedWith,
    ...otherProps,
  }
}

export default useUsersSharedWith
