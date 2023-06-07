import api from "@/web/services/api"
import { Switch } from "@nextui-org/react"
import { useContext, useState } from "react"
import FormData from "../types/FormData"
import AppContext from "./AppContext"
import EditIcon from "./EditIcon"
import WishForm from "./WishForm"
import Wish from "../types/Wish"

type Props = {
  wish: Wish
}

const WishEditForm = (props: Props) => {
  const { wish } = props
  const [purchased, setPurchased] = useState<boolean>(
    wish ? wish.purchased : false
  )
  const {
    actions: { getWishList },
  } = useContext(AppContext)

  const togglePurchased = () => {
    setPurchased(!purchased)
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      const {
        data: { result },
      } = await api.patch(`/wish/${wish.id}`, formData)

      await getWishList()
    } catch (err) {
      return
    }
  }

  return (
    <WishForm
      title="Modifier cette envie"
      icon={<EditIcon />}
      color="warning"
      className="right-0 z-10"
      handleSubmit={handleSubmit}
      initialValues={wish}
      buttonTitle="Modifier"
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
    </WishForm>
  )
}

export default WishEditForm
