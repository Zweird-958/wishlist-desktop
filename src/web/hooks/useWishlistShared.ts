import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import api from "../services/api"
import { useWishlistSharedStore } from "../stores/wishlistShared"
import User from "../types/User"
import useHandleErrors from "./useHandleErrors"
import useSession from "./useSession"

const useWishlistShared = () => {
  const { usersShared, setUsersShared, ...otherProps } =
    useWishlistSharedStore()

  const { handleError } = useHandleErrors()
  const { session } = useSession()

  const { data, isFetching } = useQuery({
    queryKey: ["wishShared"],
    queryFn: () => {
      return api.get<User[]>("/share/wish")
    },
    select: (data) => data.result,
    enabled: usersShared.length === 0 && session !== null,
    onError: handleError,
  })

  // const previousValue = useRef(usersShared)

  // if (previousValue.current !== data && data && session) {
  //   previousValue.current = data
  //   setUsersShared(data)
  // }

  useEffect(() => {
    if (usersShared.length === 0 && data && session) {
      setUsersShared(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setUsersShared, usersShared.length])

  return {
    isFetching,
    usersShared,
    setUsersShared,
    ...otherProps,
  }
}

export default useWishlistShared
