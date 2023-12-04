type Wish = {
  name: string
  image: string
  currency: string
  price: number
  link: string
  purchased: boolean
  id: number
  createdAt: string | Date
  priceFormatted: string
  isPrivate: boolean
}

export default Wish
