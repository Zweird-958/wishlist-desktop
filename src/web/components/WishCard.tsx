import DeleteIcon from "@/components/DeleteIcon"
import EditIcon from "@/components/EditIcon"
import formatCurrency from "@/utils/formatCurrency"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react"
import { useState } from "react"

type WishCardProps = {
  wish: Wish
  // eslint-disable-next-line no-unused-vars
  deleteWish: (id: number) => void
}

type Wish = {
  name: string
  image: string
  currency: string
  price: number
  id: number
}

const WishCard = (props: WishCardProps) => {
  const { wish, deleteWish } = props
  const { name, image, currency, price, id } = wish

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
            <Button
              isIconOnly
              className="right-0 z-10"
              color="warning"
              onPress={() => console.log("edit")}
            >
              <EditIcon />
            </Button>
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
        <Button radius="lg" color="primary">
          LINK
        </Button>
      </CardFooter>
    </Card>
  )
}

export default WishCard
