import FullDiv from "./FullDiv"
import FormField from "@/web/components/FormField"
import Form from "@/web/components/Form"
import Select from "./Select"
import { Button } from "@nextui-org/react"
import * as yup from "yup"
import { useState } from "react"
import api from "@/web/services/api"

type Props = {
  currencies: string[]
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void
  // eslint-disable-next-line no-unused-vars
  updateWishList: (value: any) => void
}

type FormProps = {
  name: string
  price: string
}

const initialValues = {
  name: "",
  price: "",
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Veuillez entrer un nom"),
  price: yup.number().required("Veuillez entrer un prix"),
})

const WishForm = (props: Props) => {
  const { currencies, setIsOpen, updateWishList } = props
  const [image, setImage] = useState(null)
  const [currency, setCurrency] = useState(currencies[0])
  console.log(props)

  const onSelectionChange = (value: string) => {
    setCurrency(value)
  }

  const handleSubmit = async (values: FormProps) => {
    const { name, price } = values

    const formData = new FormData()

    if (image) {
      formData.append("image", image)
    }

    if (currency) {
      formData.append("currency", currency)
    }

    formData.append("name", name)
    formData.append("price", price)

    try {
      const {
        data: { result },
      } = await api.post("/wish", formData)

      updateWishList(result)
      // setWishList((prev) => [...prev, result])
      setIsOpen(false)
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
        button="Créer"
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField name="name" type="text" label="Nom" />
        <FormField name="price" type="number" label="Prix" />
        <Select
          onSelectionChange={onSelectionChange}
          selectedValue={currency}
          items={currencies}
        />
        <Button as="label">
          Ajouter une image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Button>
      </Form>
    </FullDiv>
  )
}

export default WishForm