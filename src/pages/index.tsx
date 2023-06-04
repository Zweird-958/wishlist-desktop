import WishForm from "@/web/components/WishForm"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import AddIcon from "@/web/components/AddIcon"
import WishCard from "@/web/components/WishCard"
import api from "@/web/services/api"
import { Button, Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"
import WishEditForm from "@/web/components/WishEditForm"

const Home = () => {
  const [wishList, setWishList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [wishSelected, setWishSelected] = useState(null)
  const [currencies, setCurrencies] = useState([])

  const updateWishList = (newWish: any) => {
    setWishList((prev: any) => [...prev, newWish])
  }

  useEffect(() => {
    ;(async () => {
      getWishList()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getWishList = async () => {
    try {
      const {
        data: { result },
      } = await api.get("/wish")

      setWishList(result)

      const {
        data: { result: currencies },
      } = await api.get("/currency")
      setCurrencies(currencies)
    } catch (err) {
      return
    }
  }

  const deleteWish = async (id: number) => {
    try {
      const {
        data: { result },
      } = await api.delete(`/wish/${id}`)

      setWishList(wishList.filter((wish: any) => wish.id !== result.id))
    } catch (err) {
      return
    }
  }

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
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 mt-5 mx-auto">
          {wishList.map((wish, index) => (
            <WishCard
              key={index}
              wish={wish}
              deleteWish={deleteWish}
              setWishSelected={setWishSelected}
            />
          ))}
        </div>
      )}
      <Button
        isIconOnly
        color="danger"
        aria-label="Add"
        className="z-20 fixed right-5 bottom-5"
        onPress={() => setIsOpen(!isOpen)}
      >
        <AddIcon />
      </Button>
      {isOpen && (
        <WishForm
          currencies={currencies}
          setIsOpen={setIsOpen}
          updateWishList={updateWishList}
        />
      )}
      {wishSelected && (
        <WishEditForm
          currencies={currencies}
          wish={wishSelected}
          setWishSelected={setWishSelected}
          getWishList={getWishList}
        />
      )}
    </>
  )
}

export default Home
