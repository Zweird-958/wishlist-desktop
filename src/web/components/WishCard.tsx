import Wish from "@/web/types/Wish"
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react"
import { open } from "@tauri-apps/api/shell"
import { useAtom } from "jotai"
import { commonAtom } from "../atom/language"
import DeletePopover from "./DeletePopover"
import WishEditForm from "./WishEditForm"

type WishCardProps = {
  wish: Wish
  canEdit?: boolean
}

const WishCard = (props: WishCardProps) => {
  const { wish, canEdit } = props
  const { name, image, id, link, priceFormatted } = wish
  const [common] = useAtom(commonAtom)

  return (
    <Card className="sm:w-[330px] w-full" radius="lg" shadow="lg">
      <CardHeader className="z-10">
        <div className="flex flex-col gap-2 w-full">
          {canEdit && (
            <div className="flex justify-between w-full">
              <DeletePopover id={id} />
              <WishEditForm wish={wish} />
            </div>
          )}
          <h4 className="text-3xl font-medium text-foreground truncate">
            {name}
          </h4>
        </div>
      </CardHeader>
      <div className="flex justify-center items-center px-5">
        <Image
          isBlurred
          alt="Card background"
          className="h-[400px] w-full object-contain"
          src={image}
        />
      </div>
      <CardFooter className="justify-between">
        <p className="text-md font-medium text-foreground">{priceFormatted}</p>

        {link && (
          <Button
            radius="lg"
            color="primary"
            onPress={() => {
              void open(link)
            }}
          >
            {common.buy}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default WishCard
