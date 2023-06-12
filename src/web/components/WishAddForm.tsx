import api from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import useWish from "../hooks/useWishlist"
import FormData from "../types/FormData"
import WishResponse from "../types/WishResponse"
import AddIcon from "./AddIcon"
import WishForm from "./WishForm"

const initialValues = {
  name: "",
  price: "",
  link: "",
}

const WishAddForm = () => {
  const {
    wishStore: { addWish },
  } = useWish()

  const mutation = useMutation<WishResponse>({
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
