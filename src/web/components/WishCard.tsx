import formatCurrency from "@/utils/formatCurrency"
import DeleteIcon from "@/web/components/DeleteIcon"
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react"
import Link from "next/link"
import WishEditForm from "./WishEditForm"
import Wish from "@/web/types/Wish"

type WishCardProps = {
  wish: Wish
  deleteWish: (id: number) => void
}

const WishCard = (props: WishCardProps) => {
  const { wish, deleteWish } = props
  const { name, image, currency, price, id, link } = wish

  return (
    <Card
      className="sm:w-[330px] w-full bg-zinc-100 dark:bg-zinc-100"
      radius="xl"
      shadow="lg"
    >
      <CardHeader className="z-10">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between w-full">
            <Button
              isIconOnly
              color="danger"
              className="right-0 z-10"
              onPress={() => deleteWish(id)}
            >
              <DeleteIcon />
            </Button>
            <WishEditForm wish={wish} />
          </div>
          <h4 className="text-3xl font-medium text-black">{name}</h4>
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
        <p className="text-md font-medium text-black/80">
          {formatCurrency(price, currency)}
        </p>
        {link && (
          <Button radius="lg" color="primary" as={Link} href={link}>
            Acheter
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default WishCard
