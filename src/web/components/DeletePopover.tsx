import DeleteIcon from "@/web/components/DeleteIcon"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { useContext } from "react"
import AppContext from "./AppContext"
import api from "../services/api"
import { useMutation } from "@tanstack/react-query"
import WishResponse from "../types/WishResponse"
import useWish from "../hooks/useWishlist"

type Props = {
  id: number
}

const DeletePopover = (props: Props) => {
  const { id } = props

  const {
    wishStore: { removeWish },
  } = useWish()

  const mutation = useMutation<WishResponse>({
    mutationFn: () => {
      return api.delete(`/wish/${id}22`)
    },
    onError: (error) => {
      const {
        response: {
          data: { status },
        },
      } = error

      if (status === 404) {
        console.log("Wish not found")
      }
    },
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
