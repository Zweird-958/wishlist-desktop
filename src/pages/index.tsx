import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import FullDiv from "@/web/components/FullDiv"
import Loading from "@/web/components/Loading"
import Select from "@/web/components/Select"
import WishAddForm from "@/web/components/WishAddForm"
import WishCard from "@/web/components/WishCard"
import api from "@/web/services/api"
import Dropdown from "@/web/types/Dropdown"
import Wish from "@/web/types/Wish"
import { Card, CardBody } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"

const FILTERS = ["Tous", "Achetées", "Non Achetées"]
const SORTS = ["Date", "Prix croissant", "Prix décroissant"]

type Result = {
  result: Wish[]
}

const Home = () => {
  const [filter, setFilter] = useState<string>(FILTERS[0] as string)
  const [sort, setSort] = useState<string>(SORTS[0] as string)

  const selectSort = (value: Dropdown) => {
    const sortSelected: string = value.currentKey
    setSort(sortSelected)
  }

  const { data, isLoading } = useQuery<Result>({
    queryKey: ["wishList"],
    queryFn: () => api.get("/wish"),
  })

  const wishlist = useMemo(() => {
    if (!data) {
      return []
    }

    if (sort === SORTS[0]) {
      return data.result.sort(
        (a: Wish, b: Wish) => new Date(a.createdAt) - new Date(b.createdAt)
      )
    } else if (sort === SORTS[1]) {
      return data.result.sort((a: Wish, b: Wish) => a.price - b.price)
    } else {
      return data.result.sort((a: Wish, b: Wish) => b.price - a.price)
    }
  }, [sort, data])

  return (
    <>
      {isLoading ? (
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

              console.log("wish", wish)

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
