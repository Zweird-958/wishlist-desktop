import { commonAtom } from "@/web/atom/language"
import DisplayWishlist from "@/web/components/DisplayWishlist"
import Page from "@/web/components/Page"
import WishAddForm from "@/web/components/WishAddForm"
import useWishlist from "@/web/hooks/useWishlist"
import { useAtom } from "jotai"

const Home = () => {
  const [common] = useAtom(commonAtom)

  const { wishlist, isFetching, sort, sortWishlist } = useWishlist()

  return (
    <Page>
      <DisplayWishlist
        wishlist={wishlist}
        isFetching={isFetching}
        sort={sort}
        sortWishlist={sortWishlist}
        emptyText={common.empty}
        canEdit={true}
      />
      <WishAddForm />
    </Page>
  )
}

export default Home
