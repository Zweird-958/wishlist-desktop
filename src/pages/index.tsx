import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import FullDiv from "@/web/components/FullDiv"
import Loading from "@/web/components/Loading"
import Select from "@/web/components/Select"
import WishAddForm from "@/web/components/WishAddForm"
import WishCard from "@/web/components/WishCard"
import useWish from "@/web/hooks/useWishlist"
import { SORTS } from "@/web/stores/wish"
import Dropdown from "@/web/types/Dropdown"
import Wish from "@/web/types/Wish"
import { Card, CardBody } from "@nextui-org/react"
import { useState } from "react"

const FILTERS = ["Tous", "Achetées", "Non Achetées"]

const Home = () => {
  const [filter, setFilter] = useState<string>(FILTERS[0] as string)

  const {
    wishlist,
    isFetching,
    wishStore: { sort, sortWishlist },
  } = useWish()
  const selectSort = (value: Dropdown) => {
    const sortSelected: string = value.currentKey
    sortWishlist(sortSelected)
  }

  return (
    <>
      {isFetching ? (
        <FullDiv>
          <Loading />
        </FullDiv>
      ) : wishlist.length === 0 ? (
        <AbsoluteDiv>
          <Card>
            <CardBody>
              <p>Vous n'avez pas encore de liste d'envies.</p>
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
                onSelectionChange={selectSort}
              />
              <Select
                selectedValue={filter}
                items={FILTERS}
                onSelectionChange={(value) => setFilter(value.currentKey)}
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
    </>
  )
}

export default Home
