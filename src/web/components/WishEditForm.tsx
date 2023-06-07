import api from "@/web/services/api"
import { Button, Switch } from "@nextui-org/react"
import FormData from "../types/FormData"
import WishForm from "./WishForm"
import { useState } from "react"

type Wish = {
  name: string
  image: string
  currency: string
  price: number
  link: string
  purchased: boolean
  id: number
}

type Props = {
  currencies: string[]
  wish: Wish
  setWishSelected: (value: Wish | null) => void
  getWishList: () => void
}

const WishEditForm = (props: Props) => {
  const { wish, setWishSelected, getWishList } = props
  const [purchased, setPurchased] = useState<boolean>(wish.purchased)

  const togglePurchased = () => {
    setPurchased(!purchased)
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      const {
        data: { result },
      } = await api.patch(`/wish/${wish.id}`, formData)

      setWishSelected(null)
      getWishList()
    } catch (err) {
      return
    }
  }

  return (
    <WishForm
      handleSubmit={handleSubmit}
      initialValues={{ ...wish, link: wish.link ?? "" }}
      title="Modifier votre envie"
      purchased={purchased}
    >
      <div className="flex justify-between">
        <p>Acheté(e)</p>
        <Switch
          color="primary"
          isSelected={purchased}
          onValueChange={togglePurchased}
        />
      </div>
      <div className="flex justify-between">
        <Button color="danger" onPress={() => setWishSelected(null)}>
          Annuler
        </Button>
        <Button type="submit" color="primary">
          Modifier
        </Button>
      </div>
    </WishForm>
  )
}

export default WishEditForm
