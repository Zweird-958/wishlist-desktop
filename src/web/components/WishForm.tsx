import api from "@/web/services/api"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { ChangeEventHandler, useEffect, useMemo, useState } from "react"
import * as yup from "yup"
import useHandleErrors from "../hooks/useHandleErrors"
import Color from "../types/Color"
import FormDataType from "../types/FormData"
import InitialValues from "../types/InitialValues"
import Wish from "../types/Wish"
import FormField from "./FormField"
import Select from "./Select"

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
  handleSubmit: (value: FormData) => void
  initialValues: Wish | InitialValues
  buttonTitle: string
  title: string
  purchased?: boolean
  isLoading: boolean
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
    isLoading,
  } = props

  const [image, setImage] = useState<File | null>(null)
  const [currency, setCurrency] = useState<string | Set<React.Key>>(new Set([]))
  const { handleError } = useHandleErrors()

  const selectedCurrency = useMemo(
      () =>
         Array.from(currency)
           .map((key) => key.toString().replace("_", " "))
           .join(", "),
       [currency],
     )

  const { data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => api.get<string[]>("/currency"),
    select: (data) => data.result,
    onError: handleError,
  })

  useEffect(() => {
    if (isLoading === false) {
      onClose()
    }
  }, [isLoading, onClose])

  useMemo(() => {
    if (!initialValues.currency) {
      setCurrency(currencies && currencies[0] ? new Set([currencies[0]]) : "")
    } else {
      setCurrency(new Set([initialValues.currency]))
    }
  }, [currencies, initialValues])

  const createFormData = (values: InitialValues | Wish) => {
    const { name, price, link } = values
    const formData = new FormData()
    const data: FormDataType = {
      name,
      price: price.toString(),
      link,
      purchased: purchased ? purchased.toString() : undefined,
      currency: selectedCurrency,
      image: image ?? undefined,
    }

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    return formData
  }

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files

    if (file?.item(0)) {
      setImage(file.item(0))
    }
  }

  const onSubmit = (values: InitialValues | Wish) => {
    const formData = createFormData(values)

    try {
      handleSubmit(formData)
    } catch (error) {
      return
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
                  onSelectionChange={setCurrency}
                  selectedValue={selectedCurrency}
                  items={currencies ?? []}
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
