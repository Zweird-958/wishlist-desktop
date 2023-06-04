import FullDiv from "./FullDiv"
import FormField from "@/web/components/FormField"
import Form from "@/web/components/Form"
import Select from "./Select"
import { Button } from "@nextui-org/react"
import * as yup from "yup"
import { useState } from "react"
import api from "@/web/services/api"

type Wish = {
  name: string
  image: string
  currency: string
  price: number
  link: string
  purchased: boolean
  id: number
}

type Props = {
  currencies: string[]
  wish: Wish
  setWishSelected: (value: Wish | null) => void
  getWishList: () => void
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Veuillez entrer un nom"),
  price: yup.number().required("Veuillez entrer un prix"),
  link: yup.string().url("Veuillez entrer un lien valide"),
})

const WishEditForm = (props: Props) => {
  const { currencies, wish, setWishSelected, getWishList } = props
  const [image, setImage] = useState<File | null>(null)
  const [currency, setCurrency] = useState(wish.currency)

  const onSelectionChange = (value: any) => {
    setCurrency(value.currentKey)
  }

  const handleSubmit = async (values: Wish) => {
    const { name, price, link } = values

    const formData = new FormData()

    if (image) {
      formData.append("image", image)
    }

    if (currency) {
      formData.append("currency", currency)
    }

    if (link) {
      formData.append("link", link)
    }

    formData.append("name", name)
    formData.append("price", price)

    try {
      const {
        data: { result },
      } = await api.patch(`/wish/${wish.id}`, formData)

      setWishSelected(null)
      getWishList()
    } catch (err) {
      console.log(err)

      return
    }
  }

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0]
    setImage(file)
  }

  return (
    <FullDiv className="z-10 fixed">
      <Form
        title="Ajouter à la liste d'envies"
        initialValues={{ ...wish, link: wish.link !== null ? wish.link : "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField name="name" type="text" label="Nom" />
        <FormField name="price" type="number" label="Prix" />
        <FormField name="link" type="url" label="Lien" />
        <Select
          onSelectionChange={onSelectionChange}
          selectedValue={currency}
          items={currencies}
        />
        <Button as="label" className="truncate">
          {image ? image.name : "Ajouter une image"}
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileUpload}
          />
        </Button>
        <div className="flex justify-between">
          <Button color="danger" onPress={() => setWishSelected(null)}>
            Annuler
          </Button>
          <Button type="submit" color="primary">
            Ajouter
          </Button>
        </div>
      </Form>
    </FullDiv>
  )
}

export default WishEditForm
