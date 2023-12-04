import api from "@/web/services/api"
import { Switch } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useState } from "react"
import { fieldsAtom, formsAtom } from "../atom/language"
import useHandleErrors from "../hooks/useHandleErrors"
import useWishlist from "../hooks/useWishlist"
import Wish from "../types/Wish"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import WishForm from "./WishForm"

type Props = {
  wish: Wish
}

const WishEditForm = (props: Props) => {
  const { wish } = props
  const [forms] = useAtom(formsAtom)
  const [fields] = useAtom(fieldsAtom)

  const [purchased, setPurchased] = useState<boolean>(
    wish ? wish.purchased : false
  )
  const [isPrivate, setIsPrivate] = useState<boolean>(
    wish ? wish.isPrivate : false
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
  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate)
  }

  const handleSubmit = (formData: FormData) => {
    mutation.mutate(formData)
  }

  return (
    <WishForm
      title={forms.wish.edit.title}
      icon={<PencilSquareIcon className="w-6 text-white" />}
      color="warning"
      className="right-0 z-10"
      handleSubmit={handleSubmit}
      initialValues={{ ...wish, link: wish.link ?? "" }}
      buttonTitle={forms.wish.edit.button}
      purchased={purchased}
      isPrivate={isPrivate}
      isLoading={mutation.isLoading}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p>{fields.bought}</p>
          <Switch
            color="primary"
            isSelected={purchased}
            onValueChange={togglePurchased}
          />
        </div>
        <div className="flex justify-between">
          <p>{fields.private}</p>
          <Switch
            color="primary"
            isSelected={isPrivate}
            onValueChange={toggleIsPrivate}
          />
        </div>
      </div>
    </WishForm>
  )
}

export default WishEditForm
