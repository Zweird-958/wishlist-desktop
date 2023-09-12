import { commonAtom } from "@/web/atom/language"
import DisplayWishlist from "@/web/components/DisplayWishlist"
import Page from "@/web/components/Page"
import WishAddForm from "@/web/components/WishAddForm"
import useWishlist from "@/web/hooks/useWishlist"
import useWishlistShared from "@/web/hooks/useWishlistShared"
import Wish from "@/web/types/Wish"
import { useAtom } from "jotai"

const Home = () => {
  const [common] = useAtom(commonAtom)

  const { wishlist, isFetching, sort, sortWishlist } = useWishlist()
  const {
    fetchingWishlist,
    currentWishlistShared,
    sort: sharedSort,
    sortWishlist: sharedSortWishlist,
  } = useWishlistShared()

  return (
    <Page>
      {fetchingWishlist || currentWishlistShared ? (
        <DisplayWishlist
          wishlist={currentWishlistShared as Wish[]}
          isFetching={fetchingWishlist}
          sort={sharedSort}
          sortWishlist={sharedSortWishlist}
          emptyText={common.emptyShared}
        />
      ) : (
        <>
          <DisplayWishlist
            wishlist={wishlist}
            isFetching={isFetching}
            sort={sort}
            sortWishlist={sortWishlist}
            emptyText={common.empty}
            canEdit={true}
          />
          <WishAddForm />
        </>
      )}
    </Page>
  )
}

export default Home
