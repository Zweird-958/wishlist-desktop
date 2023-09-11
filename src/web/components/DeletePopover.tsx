import DeleteIcon from "@/web/components/DeleteIcon"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { commonAtom } from "../atom/language"
import useHandleErrors from "../hooks/useHandleErrors"
import useWishlist from "../hooks/useWishlist"
import api from "../services/api"
import Wish from "../types/Wish"

type Props = {
  id: number
}

const DeletePopover = (props: Props) => {
  const { onOpenChange, onClose } = useDisclosure()
  const { id } = props
  const { handleError } = useHandleErrors()
  const [common] = useAtom(commonAtom)

  const { removeWish } = useWishlist()

  const mutation = useMutation({
    mutationFn: () => {
      return api.delete<Wish>(`/wish/${id}`)
    },
    onError: handleError,
    onSuccess: (data) => {
      onClose()
      removeWish(data.result)
    },
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  return (
    <Popover
      placement="top"
      color="danger"
      backdrop="opaque"
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger>
        <Button isIconOnly color="danger">
          <DeleteIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <p className="text-sm font-bold">{common.delete.title}</p>
          <p className="text-xs">{common.delete.subtitle}</p>
          <div className="flex justify-end">
            <Button
              size="sm"
              className="mt-2 text-white"
              radius="md"
              variant="bordered"
              onPress={handleDelete}
              isLoading={mutation.isLoading}
            >
              {common.delete.confirm}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DeletePopover
