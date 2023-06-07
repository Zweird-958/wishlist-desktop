import api from "@/web/services/api"
import FormData from "../types/FormData"
import AddIcon from "./AddIcon"
import WishForm from "./WishForm"

const initialValues = {
  name: "",
  price: "",
  link: "",
}

const WishAddForm = () => {
  const handleSubmit = async (formData: FormData) => {
    try {
      await api.post("/wish", formData)
    } catch (err) {
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
