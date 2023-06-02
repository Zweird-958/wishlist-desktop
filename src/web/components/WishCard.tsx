import EditIcon from "@/components/EditIcon"
import formatCurrency from "@/utils/formatCurrency"
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  CardFooter,
} from "@nextui-org/react"
import { useState } from "react"

type WishCardProps = {
  name: string
  image: string
  currency: string
  price: number
  id: number
}

const WishCard = (props: WishCardProps) => {
  const { name, image, currency, price, id } = props

  const [isFollowed, setIsFollowed] = useState(false)

  return (
    <Card
      isPressable
      onPress={() => console.log("item pressed")}
      className="w-1/3 "
    >
      <CardBody className="overflow-visible p-0">
        <Button
          isIconOnly
          className="right-0 z-10"
          onPress={() => console.log("edit")}
        >
          <EditIcon />
        </Button>
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
