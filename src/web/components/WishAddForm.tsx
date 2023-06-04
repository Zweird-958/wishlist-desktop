import api from "@/web/services/api"
import WishForm from "./WishForm"

type Props = {
  setIsOpen: (value: boolean) => void
  updateWishList: (value: any) => void
}

const initialValues = {
  name: "",
  price: "",
  link: "",
}

const WishAddForm = (props: Props) => {
  const { setIsOpen, updateWishList } = props

  const handleSubmit = async (formData) => {
    try {
      const {
        data: { result },
      } = await api.post("/wish", formData)

      updateWishList(result)
      setIsOpen(false)
    } catch (err) {
      console.log(err)

      return
    }
  }

  return (
    <WishForm
      title="Ajouter à votre liste envie"
      button="Créer"
      initialValues={initialValues}
      handleSubmit={handleSubmit}
    />
  )
}

export default WishAddForm
