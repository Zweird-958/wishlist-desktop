import { useQuery } from "@tanstack/react-query"
import { useWishStore } from "../stores/wish"
import { useEffect } from "react"
import Wish from "../types/Wish"
import api from "../services/api"

type Result = {
  result: Wish[]
}

const useWish = () => {
  const wishStore = useWishStore((state) => state)
  const wishlist = wishStore.wishlist

  // const { data, isFetching } = api.tag.getAll.useQuery(undefined, {
  //   enabled: tags.length === 0,
  // })

  const { data, isFetching } = useQuery<Result>({
    queryKey: ["wishList"],
    queryFn: () => api.get("/wish"),
    enabled: wishlist.length === 0,
  })

  useEffect(() => {
    if (wishlist.length === 0 && data) {
      wishStore.setWishlist(data.result)
    }
  }, [data, wishStore, wishlist.length])

  return { wishlist, wishStore, isFetching }
}

export default useWish
