import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import api from "@/web/services/api"
import { Button } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import * as yup from "yup"
import FormData from "../types/FormData"
import Wish from "../types/Wish"
import Dropdown from "../types/Dropdown"
import FullDiv from "./FullDiv"
import Select from "./Select"
import InitialValues from "../types/InitialValues"

type Props = {
  handleSubmit: (value: FormData) => void
  children?: React.ReactNode
  initialValues: Wish | InitialValues
  button?: string
  title: string
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Veuillez entrer un nom"),
  price: yup.number().required("Veuillez entrer un prix"),
  link: yup.string().url("Veuillez entrer un lien valide"),
})

const WishForm = (props: Props) => {
  const { handleSubmit, children, initialValues, button, title } = props

  const [image, setImage] = useState<File | null>(null)
  const [currencies, setCurrencies] = useState([])
  const [currency, setCurrency] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const {
        data: { result: currencies },
      } = await api.get("/currency")

      setCurrencies(currencies)
      setCurrency(initialValues.currency ?? currencies[0])
    })()
  }, [])

  const onSelectionChange = (value: Dropdown) => {
    setCurrency(value.currentKey)
  }

  const createFormData = (values: InitialValues) => {
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

    return formData
  }

  const handleFileUpload = (event: Event) => {
    const file: File = event.target.files[0]
    setImage(file)
  }

  return (
    <FullDiv className="z-10 fixed">
      <Form
        title={title}
        button={button}
        initialValues={initialValues}
        onSubmit={async (values: InitialValues) => {
          const formData = createFormData(values)
          setIsLoading(true)
          await handleSubmit(formData)
          setIsLoading(false)
        }}
        validationSchema={validationSchema}
        isLoading={isLoading}
      >
        <FormField name="name" type="text" label="Nom" />
        <FormField name="price" type="number" label="Prix" />
        <FormField name="link" type="url" label="Lien" />
        <Select
          onSelectionChange={onSelectionChange}
          selectedValue={currency}
          items={currencies}
        />
        <Button as="label" className="truncate" color="primary">
          {image ? image.name : "Ajouter une image"}
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileUpload}
          />
        </Button>
        {children}
      </Form>
    </FullDiv>
  )
}

export default WishForm
