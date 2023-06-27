import api from "@/web/services/api"
import { Switch } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import useHandleErrors from "../hooks/useHandleErrors"
import useWish from "../hooks/useWishlist"
import Wish from "../types/Wish"
import EditIcon from "./EditIcon"
import WishForm from "./WishForm"

type Props = {
  wish: Wish
}

const WishEditForm = (props: Props) => {
  const { wish } = props
  const [purchased, setPurchased] = useState<boolean>(
    wish ? wish.purchased : false
  )
  const { handleError } = useHandleErrors()

  const {
    wishStore: { updateWish },
  } = useWish()

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return api.patch<Wish>(`/wish/${wish.id}`, formData)
    },
    onSuccess: (data) => {
      updateWish(data.result)
    },
    onError: handleError,
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
      isLoading={mutation.isLoading}
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
