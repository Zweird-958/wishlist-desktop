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
import { useAtom } from "jotai"
import { ChangeEventHandler, useEffect, useMemo, useState } from "react"
import * as yup from "yup"
import { fieldsAtom, formsAtom } from "../atom/language"
import useHandleErrors from "../hooks/useHandleErrors"
import Color from "../types/Color"
import FormDataType from "../types/FormData"
import InitialValues from "../types/InitialValues"
import Wish from "../types/Wish"
import FormField from "./FormField"
import Select from "./Select"

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
  const [forms] = useAtom(formsAtom)
  const [fields] = useAtom(fieldsAtom)

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

  const validationSchema = yup.object().shape({
    name: yup.string().required(forms.wish.name.required),
    price: yup.number().required(forms.wish.price.required),
    link: yup.string().url(forms.wish.link.invalid),
  })

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
      setCurrency(currencies && currencies[0] ? currencies[0] : "")
    } else {
      setCurrency(initialValues.currency)
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
      currency: currency,
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
      setImage(null)
      setCurrency(currencies && currencies[0] ? currencies[0] : "")
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
                <FormField name="name" type="text" label={fields.name} />
                <FormField name="price" type="number" label={fields.price} />
                <FormField name="link" type="url" label={fields.link} />
                <Select
                  onSelectionChange={(value) => setCurrency(value as string)}
                  selectedValue={currency}
                  items={currencies ?? []}
                />
                <Button as="label" className="truncate" color="primary">
                  {image ? image.name : fields.image}
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
                  {forms.wish.close}
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
