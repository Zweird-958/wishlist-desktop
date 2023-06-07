import WishForm from "@/web/components/WishForm"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import AddIcon from "@/web/components/AddIcon"
import WishCard from "@/web/components/WishCard"
import api from "@/web/services/api"
import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react"
import WishEditForm from "@/web/components/WishEditForm"
import WishAddForm from "@/web/components/WishAddForm"
import Select from "@/web/components/Select"
import Wish from "@/web/types/Wish"
import Dropdown from "@/web/types/Dropdown"
import Modal from "@/web/components/WishForm"
import AppContext from "@/web/components/AppContext"

const FILTERS = ["Tous", "Achetées", "Non Achetées"]
const SORTS = ["Date", "Prix croissant", "Prix décroissant"]

const Home = () => {
  const [filter, setFilter] = useState<string>(FILTERS[0] as string)
  const [sort, setSort] = useState<string>(SORTS[0] as string)

  const {
    actions: { getWishList },
    state: { wishList },
  } = useContext(AppContext)

  const sortWishList = (value: Dropdown) => {
    const sortSelected: string = value.currentKey
    setSort(sortSelected)

    if (sortSelected === SORTS[0]) {
      setWishList(
        wishList.sort(
          (a: Wish, b: Wish) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      )
    } else if (sortSelected === SORTS[1]) {
      setWishList(wishList.sort((a: Wish, b: Wish) => a.price - b.price))
    } else {
      setWishList(wishList.sort((a: Wish, b: Wish) => b.price - a.price))
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        await getWishList()
      } catch (error) {
        return
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {wishList.length === 0 ? (
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
                onSelectionChange={sortWishList}
              />
              <Select
                selectedValue={filter}
                items={FILTERS}
                onSelectionChange={(value) => setFilter(value.currentKey)}
              />
            </div>
            {wishList.map((wish: Wish, index) => {
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
