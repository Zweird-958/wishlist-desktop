import WishForm from "@/components/WishForm"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import AddIcon from "@/web/components/AddIcon"
import WishCard from "@/web/components/WishCard"
import api from "@/web/services/api"
import { Button, Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"

const Home = () => {
  const [wishList, setWishList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [wishSelected, setWishSelected] = useState(false)

  const [currencies, setCurrencies] = useState([])
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/wish")

        const {
          data: { result: currencies },
        } = await api.get("/currency")
        setCurrencies(currencies)
        setCurrency(currencies[0])

        setWishList(result)
      } catch (err) {
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
        <div className="flex items-center flex-col gap-4 mt-5">
          {wishList.map(({ name, image, currency, price, id }) => (
            <WishCard
              key={id}
              name={name}
              image={image}
              currency={currency}
              price={price}
              id={id}
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
      {isOpen && <WishForm currencies={currencies} />}
      {/* {wishSelected && (
        // <SingleWish wish={wishSelected} setWishSelected={setWishSelected} />
      )} */}
    </>
  )
}

export default Home
