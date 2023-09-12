import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import api from "../services/api"
import { useWishStore } from "../stores/wish"
import Wish from "../types/Wish"
import useHandleErrors from "./useHandleErrors"
import useSession from "./useSession"

const useWishlist = () => {
  const { wishlist, setWishlist, ...wishlistProps } = useWishStore()

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
    if (wishlist.length === 0 && data && session) {
      setWishlist(data)
    }
  }, [wishlist, data, session, setWishlist])

  // const previousValue = useRef(wishlist)

  // if (previousValue.current !== data && data && session) {
  //   previousValue.current = data
  //   setWishlist(data)
  // }

  return { wishlist, isFetching, setWishlist, ...wishlistProps }
}

export default useWishlist
