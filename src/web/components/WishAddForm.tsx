import api from "@/web/services/api"
import FormData from "../types/FormData"
import AddIcon from "./AddIcon"
import WishForm from "./WishForm"
import { useMutation } from "@tanstack/react-query"
import Wish from "../types/Wish"
import { addAbortSignal } from "stream"
import useWish from "../hooks/useWishlist"

const initialValues = {
  name: "",
  price: "",
  link: "",
}

const WishAddForm = () => {
  const {
    wishStore: { addWish },
  } = useWish()

  const mutation = useMutation<Wish>({
    mutationFn: (formData: FormData) => {
      return api.post("/wish", formData)
    },
    onSuccess: (data) => {
      addWish(data.result)
    },
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
    />
  )
}

export default WishAddForm
