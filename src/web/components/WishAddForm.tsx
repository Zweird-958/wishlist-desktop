import api from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import useHandleErrors from "../hooks/useHandleErrors"
import useWishlist from "../hooks/useWishlist"
import Wish from "../types/Wish"
import AddIcon from "./AddIcon"
import WishForm from "./WishForm"

const initialValues = {
  name: "",
  price: "",
  link: "",
}

const WishAddForm = () => {
  const { addWish } = useWishlist()
  const { handleError } = useHandleErrors()

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return api.post<Wish>("/wish", formData)
    },
    onSuccess: (data) => {
      addWish(data.result)
    },
    onError: handleError,
  })

  const handleSubmit = (formData: FormData) => {
    mutation.mutate(formData)
  }

  return (
    <WishForm
      title="Ajouter à votre liste d'envie"
      icon={<AddIcon />}
      color="danger"
      className="z-20 fixed right-5 bottom-5"
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      buttonTitle="Ajouter"
      isLoading={mutation.isLoading}
    />
  )
}

export default WishAddForm
