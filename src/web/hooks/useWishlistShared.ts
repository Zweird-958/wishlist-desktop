import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import api from "../services/api"
import { useWishlistSharedStore } from "../stores/wishlistShared"
import User from "../types/User"
import useHandleErrors from "./useHandleErrors"
import useSession from "./useSession"

const useWishlistShared = () => {
  const { wishlistShared, setWishlistShared, ...otherProps } =
    useWishlistSharedStore()

  const { handleError } = useHandleErrors()
  const { session } = useSession()

  const { data, isFetching } = useQuery({
    queryKey: ["wishShared"],
    queryFn: () => {
      return api.get<User[]>("/share/wish")
    },
    select: (data) => data.result,
    enabled: wishlistShared.length === 0 && session !== null,
    onError: handleError,
  })

  // const previousValue = useRef(wishlistShared)

  // if (previousValue.current !== data && data && session) {
  //   previousValue.current = data
  //   setWishlistShared(data)
  // }

  useEffect(() => {
    if (wishlistShared.length === 0 && data && session) {
      setWishlistShared(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setWishlistShared, wishlistShared.length])

  return {
    isFetching,
    wishlistShared,
    setWishlistShared,
    ...otherProps,
  }
}

export default useWishlistShared
