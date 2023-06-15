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
import React, { ChangeEventHandler, useEffect, useMemo, useState } from "react"
import * as yup from "yup"
import useHandleErrors from "../hooks/useHandleErrors"
import Color from "../types/Color"
import Dropdown from "../types/Dropdown"
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
  handleSubmit: (value: FormDataType) => void
  initialValues: Wish | InitialValues
  buttonTitle: string
  title: string
  purchased?: boolean
  isLoading: boolean
}

type Result = {
  result: string[]
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
  const [currency, setCurrency] = useState<string>("")
  const { handleError } = useHandleErrors()

  const { data: currencies } = useQuery<Result>({
    queryKey: ["currencies"],
    queryFn: () => api.get("/currency"),
    onError: handleError,
  })

  useEffect(() => {
    if (isLoading === false) {
      onClose()
    }
  }, [isLoading, onClose])

  useMemo(() => {
    if (!initialValues.currency) {
      setCurrency(currencies ? currencies.result[0] : "")
    } else {
      setCurrency(initialValues.currency)
    }
  }, [currencies, initialValues])

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

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    return formData
  }

  const handleFileUpload = (event: ChangeEventHandler<HTMLInputElement>) => {
    const file: File = event.target.files[0]
    setImage(file)
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
                  onSelectionChange={onSelectionChange}
                  selectedValue={currency}
                  items={currencies ? currencies.result : []}
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
