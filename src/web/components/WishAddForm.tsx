import api from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import useHandleErrors from "../hooks/useHandleErrors"
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
  const { handleError } = useHandleErrors()

  const mutation = useMutation<WishResponse>({
    mutationFn: (formData: FormData) => {
      return api.post("/wish", formData)
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
