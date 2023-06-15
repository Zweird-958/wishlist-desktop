import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import api from "../services/api"
import { useWishStore } from "../stores/wish"
import Wish from "../types/Wish"
import useHandleErrors from "./useHandleErrors"
import useSession from "./useSession"

type Result = {
  result: Wish[]
}

const useWish = () => {
  const wishStore = useWishStore((state) => state)
  const wishlist = wishStore.wishlist

  const { handleError } = useHandleErrors()
  const { session } = useSession()

  const { data, isFetching } = useQuery<Result>({
    queryKey: ["wishList"],
    queryFn: () => api.get("/wish"),
    enabled: wishlist.length === 0 && session !== null,
    onError: handleError,
  })

  useEffect(() => {
    if (wishlist.length === 0 && data) {
      wishStore.setWishlist(data.result)
    }
  }, [data, wishStore, wishlist.length])

  return { wishlist, wishStore, isFetching }
}

export default useWish
