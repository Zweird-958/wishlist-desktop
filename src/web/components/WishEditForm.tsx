import FullDiv from "./FullDiv"
import FormField from "@/web/components/FormField"
import Form from "@/web/components/Form"
import Select from "./Select"
import { Button } from "@nextui-org/react"
import * as yup from "yup"
import { useState } from "react"
import api from "@/web/services/api"
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

  const handleSubmit = async (formData) => {
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
