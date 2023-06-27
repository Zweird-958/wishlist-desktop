import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import api from "../services/api"
import { useWishStore } from "../stores/wish"
import Wish from "../types/Wish"
import useHandleErrors from "./useHandleErrors"
import useSession from "./useSession"

const useWish = () => {
  const wishStore = useWishStore((state) => state)
  const wishlist = wishStore.wishlist

  const { handleError } = useHandleErrors()
  const { session } = useSession()

  const { data, isFetching } = useQuery({
    queryKey: ["wish"],
    queryFn: () => api.get<Wish[]>("/wish"),
    select: (data) => data.result,
    enabled: wishlist.length === 0 && session !== null,
    onError: handleError,
  })

  useEffect(() => {
    if (wishlist.length === 0 && data) {
      wishStore.setWishlist(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, wishlist.length])

  return { wishlist, wishStore, isFetching }
}

export default useWish
