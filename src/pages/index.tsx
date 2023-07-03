import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import FullDiv from "@/web/components/FullDiv"
import Loading from "@/web/components/Loading"
import Select from "@/web/components/Select"
import WishAddForm from "@/web/components/WishAddForm"
import WishCard from "@/web/components/WishCard"
import useWishlist from "@/web/hooks/useWishlist"
import { SORTS } from "@/web/stores/wish"
import Wish from "@/web/types/Wish"
import { Card, CardBody } from "@nextui-org/react"
import { useMemo, useState } from "react"

const FILTERS = ["Tous", "Achetées", "Non Achetées"]

const Home = () => {
  const [filter, setFilter] = useState<string | Set<React.Key>>(
    new Set([FILTERS[0] as string])
  )
  const selectedFilter = useMemo(
    () =>
      Array.from(filter)
        .map((key) => key.toString().replace("_", " "))
        .join(", "),
    [filter]
  )

  const { wishlist, isFetching, sort, sortWishlist } = useWishlist()

  const setSort = (value: string | Set<React.Key>) => {
    const selectedSort = Array.from(value).at(0) as string
    sortWishlist(selectedSort)
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
                onSelectionChange={setSort}
              />
              <Select
                selectedValue={selectedFilter}
                items={FILTERS}
                onSelectionChange={setFilter}
              />
            </div>
            {wishlist.map((wish: Wish, index) => {
              if (selectedFilter === FILTERS[1] && !wish.purchased) {
                return
              } else if (selectedFilter === FILTERS[2] && wish.purchased) {
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
