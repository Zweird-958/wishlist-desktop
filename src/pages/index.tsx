import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import WishCard from "@/web/components/WishCard"
import api from "@/web/services/api"
import { Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"

const Home = () => {
  const [wishList, setWishList] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/wish")

        setWishList(result)
      } catch (err) {
        const {
          response: { status },
        } = err

        if (status === 403) {
          window.location.href = "/sign-in"
        }

        return
      }
    })()
  }, [])

  return wishList.length === 0 ? (
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
  )
}

export default Home
