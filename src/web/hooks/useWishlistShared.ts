import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import api from "../services/api"
import { useWishlistSharedStore } from "../stores/wishlistShared"
import User from "../types/User"
import useHandleErrors from "./useHandleErrors"
import useSession from "./useSession"
import Wish from "../types/Wish"

const useWishlistShared = () => {
  const {
    usersShared,
    setUsersShared,
    setCurrentWishlistShared,
    setFetchingWishlist,
    ...otherProps
  } = useWishlistSharedStore()

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

  const wishlistMutation = useMutation({
    mutationFn: (userId: string) => api.get<Wish[]>(`/share/wish/${userId}`),
    onMutate: () => setFetchingWishlist(true),
    onError: handleError,
    onSettled: () => setFetchingWishlist(false),
    onSuccess: (data) => {
      setCurrentWishlistShared(data.result || [])
    },
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
    setCurrentWishlistShared,
    wishlistMutation,
    setFetchingWishlist,
    ...otherProps,
  }
}

export default useWishlistShared
