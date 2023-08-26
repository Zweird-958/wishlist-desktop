import api from "@/web/services/api"
import { Switch } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { useTranslation } from "next-i18next"
import { useState } from "react"
import useHandleErrors from "../hooks/useHandleErrors"
import useWishlist from "../hooks/useWishlist"
import Wish from "../types/Wish"
import EditIcon from "./EditIcon"
import WishForm from "./WishForm"

type Props = {
  wish: Wish
}

const WishEditForm = (props: Props) => {
  const { wish } = props
  const { t } = useTranslation(["forms", "fields"])

  const [purchased, setPurchased] = useState<boolean>(
    wish ? wish.purchased : false
  )
  const { handleError } = useHandleErrors()

  const { updateWish } = useWishlist()

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
      title={t("wish.edit.title")}
      icon={<EditIcon />}
      color="warning"
      className="right-0 z-10"
      handleSubmit={handleSubmit}
      initialValues={{ ...wish, link: wish.link ?? "" }}
      buttonTitle={t("wish.edit.button")}
      purchased={purchased}
      isLoading={mutation.isLoading}
    >
      <div className="flex justify-between">
        <p>{t("fields:bought")}</p>
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
