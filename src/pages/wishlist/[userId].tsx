import { commonAtom } from "@/web/atom/language"
import DisplayWishlist from "@/web/components/DisplayWishlist"
import Page from "@/web/components/Page"
import useHandleErrors from "@/web/hooks/useHandleErrors"
import api from "@/web/services/api"
import { SORTS } from "@/web/stores/wish"
import { ApiError } from "@/web/types/Api"
import Sort from "@/web/types/Sort"
import Wish from "@/web/types/Wish"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Wishlist = () => {
  const router = useRouter()
  const userId = router.query.userId as string
  const [sort, setSort] = useState<Sort>(SORTS[0] as Sort)
  const [wishlist, setWishlist] = useState<Wish[]>([])
  const [common] = useAtom(commonAtom)
  const { handleError } = useHandleErrors()

  const { data, isFetching } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => api.get<Wish[]>(`/share/wish/${userId}`),
    select: (data) => data.result,
    onError: (error: AxiosError<ApiError>) => {
      handleError(error)
      void router.push("/")
    },
    enabled: !!userId,
    onSuccess: () => {
      setWishlist(data || [])
    },
  })

  const sortWishlist = (sort: Sort) => {
    setSort(sort)

    if (sort === SORTS[0]) {
      setWishlist(
        wishlist.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      )
    } else if (sort === SORTS[1]) {
      setWishlist(wishlist.sort((a, b) => a.price - b.price))
    } else {
      setWishlist(wishlist.sort((a, b) => b.price - a.price))
    }
  }

  useEffect(() => {
    if (data) {
      setWishlist(data)
    }
  }, [data])

  return (
    <Page>
      <DisplayWishlist
        wishlist={wishlist}
        isFetching={isFetching}
        sort={sort}
        sortWishlist={sortWishlist}
        emptyText={common.emptyShared}
      />
    </Page>
  )
}

export default Wishlist
