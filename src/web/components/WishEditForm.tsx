import api from "@/web/services/api"
import { Switch } from "@nextui-org/react"
import { useState } from "react"
import FormData from "../types/FormData"
import Wish from "../types/Wish"
import EditIcon from "./EditIcon"
import WishForm from "./WishForm"
import useWish from "../hooks/useWishlist"
import { useMutation } from "@tanstack/react-query"

type Props = {
  wish: Wish
}

const WishEditForm = (props: Props) => {
  const { wish } = props
  const [purchased, setPurchased] = useState<boolean>(
    wish ? wish.purchased : false
  )

  const {
    wishStore: { updateWish },
  } = useWish()

  const mutation = useMutation<Wish>({
    mutationFn: (formData: FormData) => {
      return api.patch(`/wish/${wish.id}`, formData)
    },
    onSuccess: (data) => {
      updateWish(data.result)
    },
  })

  const togglePurchased = () => {
    setPurchased(!purchased)
  }

  const handleSubmit = (formData: FormData) => {
    mutation.mutate(formData)
  }

  return (
    <WishForm
      title="Modifier cette envie"
      icon={<EditIcon />}
      color="warning"
      className="right-0 z-10"
      handleSubmit={handleSubmit}
      initialValues={{ ...wish, link: wish.link ?? "" }}
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
