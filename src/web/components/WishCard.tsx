import DeleteIcon from "@/components/DeleteIcon"
import EditIcon from "@/components/EditIcon"
import formatCurrency from "@/utils/formatCurrency"
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react"
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
      isPressable
      onPress={() => console.log("item pressed")}
      className="w-1/3 "
    >
      <CardBody className="overflow-visible p-0">
        <div className="flex justify-between">
          <Button
            isIconOnly
            className="right-0 z-10"
            onPress={() => deleteWish(id)}
          >
            <DeleteIcon />
          </Button>
          <Button
            isIconOnly
            className="right-0 z-10"
            onPress={() => console.log("edit")}
          >
            <EditIcon />
          </Button>
        </div>
        <Image
          shadow="lg"
          radius="xl"
          width="100%"
          alt={name}
          className="w-full h-[140px] object-cover"
          src={image}
        />
      </CardBody>
      <CardFooter className="text-sm justify-between">
        <b>{name}</b>
        <p className="text-default-500">{formatCurrency(price, currency)}</p>
      </CardFooter>
    </Card>
  )
}

export default WishCard
