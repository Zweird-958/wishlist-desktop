import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-hot-toast"
import * as yup from "yup"
import { fieldsAtom, formsAtom } from "../atom/language"
import useHandleErrors from "../hooks/useHandleErrors"
import api from "../services/api"
import FormField from "./FormField"
import { WishlistShareResponse } from "../types/Api"
import useUsersSharedWith from "../hooks/useUsersSharedWith"

type Props = {
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
}

const initialValues = {
  username: "",
}

const ShareWishlist = (props: Props) => {
  const { isOpen, onClose, onOpenChange } = props
  const [forms] = useAtom(formsAtom)
  const [fields] = useAtom(fieldsAtom)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleError } = useHandleErrors()
  const { addUserSharedWith } = useUsersSharedWith()

  const validationSchema = yup.object().shape({
    username: yup.string().required(forms.share.username.required),
  })

  const addMutation = useMutation({
    mutationFn: (credentials: typeof initialValues) => {
      setIsLoading(true)

      return api.post<WishlistShareResponse>("/share/wish", credentials)
    },
    onError: handleError,
    onSettled: () => {
      setIsLoading(false)
    },
    onSuccess: (response) => {
      onClose()
      const { message, user } = response.result
      toast.success(message)
      addUserSharedWith(user)
    },
  })

  const onSubmit = async (values: typeof initialValues) => {
    await addMutation.mutateAsync(values)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>{forms.share.title}</ModalHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form noValidate>
            <ModalBody className="flex items-center">
              <FormField
                label={fields.usernameToShare}
                name="username"
                type="text"
              />
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button onPress={onClose} color="danger" variant="flat">
                {forms.close}
              </Button>
              <Button type="submit" color="primary" isLoading={isLoading}>
                {forms.share.button}
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default ShareWishlist
