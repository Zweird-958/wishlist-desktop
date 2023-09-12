import { Card, CardBody } from "@nextui-org/react"
import { Key, useState } from "react"
import { SORTS } from "../stores/wish"
import Filter from "../types/Filter"
import Sort from "../types/Sort"
import Wish from "../types/Wish"
import AbsoluteDiv from "./AbsoluteDiv"
import FullDiv from "./FullDiv"
import Loading from "./Loading"
import Select from "./Select"
import WishCard from "./WishCard"

const FILTERS: Filter[] = ["all", "bought", "notBought"]
type Props = {
  wishlist: Wish[]
  isFetching: boolean
  sort: Sort
  sortWishlist: (sort: Sort) => void
  emptyText: string
  canEdit?: boolean
}

const DisplayWishlist = (props: Props) => {
  const [filter, setFilter] = useState<Filter>(FILTERS[0] as Filter)

  const { wishlist, isFetching, sort, sortWishlist, canEdit, emptyText } = props

  const setSort = (value: Key | undefined) => {
    const selectedSort = value as Sort
    sortWishlist(selectedSort)
  }

  return isFetching ? (
    <FullDiv>
      <Loading />
    </FullDiv>
  ) : wishlist.length === 0 ? (
    <AbsoluteDiv>
      <Card>
        <CardBody>{emptyText}</CardBody>
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

          return <WishCard key={index} wish={wish} canEdit={canEdit} />
        })}
      </div>
    </div>
  )
}

export default DisplayWishlist
