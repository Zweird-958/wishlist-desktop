import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"
import { formsAtom } from "../atom/language"
import { useAtom } from "jotai"
import User from "../types/User"
import { useMutation } from "@tanstack/react-query"
import api from "../services/api"
import { WishlistShareResponse } from "../types/Api"
import useHandleErrors from "../hooks/useHandleErrors"
import { useState } from "react"
import toast from "react-hot-toast"
import useUsersSharedWith from "../hooks/useUsersSharedWith"

type Props = {
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
  user: User | null
}

const UnshareWishlist = (props: Props) => {
  const { isOpen, onClose, onOpenChange, user } = props
  const [forms] = useAtom(formsAtom)
  const { handleError } = useHandleErrors()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { removeUserSharedWith } = useUsersSharedWith()

  const unshareMutation = useMutation({
    mutationFn: (userId: number) =>
      api.delete<WishlistShareResponse>(`/share/wish/${userId}`),
    onMutate: () => {
      setIsLoading(true)
    },
    onError: handleError,
    onSuccess: (response) => {
      const { message, user } = response.result
      toast.success(message)
      onClose()
      removeUserSharedWith(user)
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>{forms.unshare.title}</ModalHeader>
        <ModalBody className="flex items-center">
          <p>{forms.unshare.content}</p>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <Button onPress={onClose} color="danger" variant="flat">
            {forms.close}
          </Button>
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            onClick={() => {
              if (user) {
                unshareMutation.mutate(user.id)
              }
            }}
          >
            {forms.unshare.button}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UnshareWishlist
