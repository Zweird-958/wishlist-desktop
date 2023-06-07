import api from "@/web/services/api"
import FormData from "../types/FormData"
import Wish from "../types/Wish"
import WishForm from "./WishForm"
import AddIcon from "./AddIcon"

type Props = {
  setIsOpen: (value: boolean) => void
  updateWishList: (value: Wish) => void
}

const initialValues = {
  name: "",
  price: "",
  link: "",
}

const WishAddForm = (props: Props) => {
  const { updateWishList } = props

  const handleSubmit = async (formData: FormData) => {
    try {
      const {
        data: { result },
      } = await api.post("/wish", formData)
      console.log(result)

      updateWishList(result)
    } catch (err) {
      console.log(err)

      return
    }
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
