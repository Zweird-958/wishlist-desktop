import api from "@/web/services/api"
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal,
  useDisclosure,
  Colors,
} from "@nextui-org/react"
import { Form, Formik } from "formik"
import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useState,
} from "react"
import * as yup from "yup"
import Dropdown from "../types/Dropdown"
import FormDataType from "../types/FormData"
import InitialValues from "../types/InitialValues"
import Wish from "../types/Wish"
import FormField from "./FormField"
import Select from "./Select"
import Color from "../types/Color"
import AppContext from "./AppContext"

const validationSchema = yup.object().shape({
  name: yup.string().required("Veuillez entrer un nom"),
  price: yup.number().required("Veuillez entrer un prix"),
  link: yup.string().url("Veuillez entrer un lien valide"),
})

type Props = {
  icon: React.ReactNode
  className?: string
  color?: Color
  children?: React.ReactNode
  handleSubmit: (value: FormDataType) => void
  initialValues: Wish | InitialValues
  buttonTitle: string
  title: string
  purchased?: boolean
}

const WishForm = (props: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const {
    icon,
    className,
    color,
    children,
    handleSubmit,
    initialValues,
    title,
    purchased,
    buttonTitle,
  } = props

  const [image, setImage] = useState<File | null>(null)
  const [currencies, setCurrencies] = useState([])
  const [currency, setCurrency] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    actions: { getWishList },
  } = useContext(AppContext)

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/currency")

        setCurrencies(result)
        setCurrency(initialValues.currency ?? result[0])
      } catch (error) {
        return
      }
    })()
  }, [initialValues])

  const onSelectionChange = (value: Dropdown) => {
    setCurrency(value.currentKey)
  }

  const createFormData = (values: InitialValues | Wish) => {
    const { name, price, link } = values
    const formData = new FormData()
    const data: FormDataType = {
      name,
      price: price.toString(),
      link,
      purchased: purchased ? purchased.toString() : undefined,
      currency,
      image: image ?? undefined,
    }

    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key])
      }
    }

    return formData
  }

  const handleFileUpload = (event: ChangeEventHandler<HTMLInputElement>) => {
    const file: File = event.target.files[0]
    setImage(file)
  }

  const onSubmit = async (values: InitialValues | Wish) => {
    const formData = createFormData(values)
    setIsLoading(true)

    try {
      await handleSubmit(formData)
      await getWishList()
    } catch (error) {
      return
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <>
      <Button onPress={onOpen} isIconOnly className={className} color={color}>
        {icon}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form noValidate>
              <ModalBody className="w-4/5 mx-auto">
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
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button onPress={onClose} color="danger" variant="flat">
                  Fermer
                </Button>
                <Button type="submit" color="primary" isLoading={isLoading}>
                  {buttonTitle}
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WishForm
