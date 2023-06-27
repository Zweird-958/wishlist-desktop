import DeleteIcon from "@/web/components/DeleteIcon"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import useHandleErrors from "../hooks/useHandleErrors"
import useWish from "../hooks/useWishlist"
import api from "../services/api"
import Wish from "../types/Wish"

type Props = {
  id: number
}

const DeletePopover = (props: Props) => {
  const { id } = props
  const { handleError } = useHandleErrors()

  const {
    wishStore: { removeWish },
  } = useWish()

  const mutation = useMutation({
    mutationFn: () => {
      return api.delete<Wish>(`/wish/${id}`)
    },
    onError: handleError,
    onSuccess: (data) => {
      removeWish(data.result)
    },
  })

  const handleDelete = () => {
    mutation.mutate()
  }

  return (
    <Popover placement="top" color="danger" backdropVariant="opaque">
      <PopoverTrigger>
        <Button isIconOnly color="danger">
          <DeleteIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <p className="text-sm font-bold">Êtes-vous sûr ?</p>
          <p className="text-xs">La suppression est irreversible !</p>
          <div className="flex justify-end">
            <Button
              size="xs"
              className="mt-2 text-white"
              radius="md"
              variant="bordered"
              onPress={handleDelete}
              isLoading={mutation.isLoading}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DeletePopover
