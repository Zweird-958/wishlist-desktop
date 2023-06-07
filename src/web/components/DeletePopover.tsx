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

type Props = {
  id: number
}

const DeletePopover = (props: Props) => {
  const { id } = props

  const {
    actions: { getWishList },
  } = useContext(AppContext)

  const deleteWish = async () => {
    try {
      await api.delete(`/wish/${id}`)
      await getWishList()
    } catch (error) {
      return
    }
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
              onPress={deleteWish}
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
