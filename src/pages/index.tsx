import { commonAtom } from "@/web/atom/language"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import FullDiv from "@/web/components/FullDiv"
import Loading from "@/web/components/Loading"
import Page from "@/web/components/Page"
import Select from "@/web/components/Select"
import WishAddForm from "@/web/components/WishAddForm"
import WishCard from "@/web/components/WishCard"
import useWishlist from "@/web/hooks/useWishlist"
import { SORTS } from "@/web/stores/wish"
import Filter from "@/web/types/Filter"
import Sort from "@/web/types/Sort"
import Wish from "@/web/types/Wish"
import { Card, CardBody } from "@nextui-org/react"
import { useAtom } from "jotai"
import { Key, useState } from "react"

const FILTERS: Filter[] = ["all", "bought", "notBought"]

const Home = () => {
  const [filter, setFilter] = useState<Filter>(FILTERS[0] as Filter)
  const [common] = useAtom(commonAtom)

  const { wishlist, isFetching, sort, sortWishlist } = useWishlist()

  const setSort = (value: Key | undefined) => {
    const selectedSort = value as Sort
    sortWishlist(selectedSort)
  }

  return (
    <Page>
      {isFetching ? (
        <FullDiv>
          <Loading />
        </FullDiv>
      ) : wishlist.length === 0 ? (
        <AbsoluteDiv>
          <Card>
            <CardBody>
              <p>{common.empty}</p>
            </CardBody>
          </Card>
        </AbsoluteDiv>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap gap-5 md:w-[700px] w-[340px] m-5 justify-center">
            <div className="w-full flex justify-between mt-5 mx-[10px]">
              <Select
                selectedValue={sort}
                items={SORTS}
                onSelectionChange={setSort}
              />
              <Select
                selectedValue={filter}
                items={FILTERS}
                onSelectionChange={(value) => setFilter(value as Filter)}
              />
            </div>
            {wishlist.map((wish: Wish, index) => {
              if (filter === FILTERS[1] && !wish.purchased) {
                return
              } else if (filter === FILTERS[2] && wish.purchased) {
                return
              }

              return <WishCard key={index} wish={wish} />
            })}
          </div>
        </div>
      )}
      <WishAddForm />
    </Page>
  )
}

export default Home
