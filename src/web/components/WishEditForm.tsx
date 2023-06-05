import api from "@/web/services/api"
import { Button } from "@nextui-org/react"
import FormData from "../types/FormData"
import WishForm from "./WishForm"

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

  const handleSubmit = async (formData: FormData) => {
    try {
      const {
        data: { result },
      } = await api.patch(`/wish/${wish.id}`, formData)

      setWishSelected(null)
      getWishList()
    } catch (err) {
      console.log(err)

      return
    }
  }
  return (
    <WishForm
      handleSubmit={handleSubmit}
      initialValues={wish}
      title="Modifier votre envie"
    >
      <div className="flex justify-between">
        <Button color="danger" onPress={() => setWishSelected(null)}>
          Annuler
        </Button>
        <Button type="submit" color="primary">
          Ajouter
        </Button>
      </div>
    </WishForm>
  )
}

export default WishEditForm
