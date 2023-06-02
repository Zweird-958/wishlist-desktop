import FullDiv from "@/components/FullDiv"
import Select from "@/components/Select"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import AddIcon from "@/web/components/AddIcon"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import WishCard from "@/web/components/WishCard"
import api from "@/web/services/api"
import { Button, Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"
import * as yup from "yup"

const initialValues = {
  name: "",
  currency: "",
  price: "",
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Veuillez entrer un nom"),
  price: yup.number().required("Veuillez entrer un prix"),
})

const Home = () => {
  const [wishList, setWishList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState(null)

  const [currencies, setCurrencies] = useState([])
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const {
          data: { result },
        } = await api.get("/wish")

        const {
          data: { result: currencies },
        } = await api.get("/currency")
        setCurrencies(currencies)
        setCurrency(currencies[0])

        setWishList(result)
      } catch (err) {
        return
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectionChange = (value: string) => {
    setCurrency(value)
  }

  const handleSubmit = async (values) => {
    const { name, currency, price } = values

    const formData = new FormData()

    if (image) {
      formData.append("image", image)
    }

    formData.append("name", name)
    formData.append("currency", currency)
    formData.append("price", price)

    try {
      const {
        data: { result },
      } = await api.post("/wish", formData)

      setWishList((prev) => [...prev, result])
      setIsOpen(false)
    } catch (err) {
      return
    }
  }

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0]
    setImage(file)
  }

  return (
    <>
      {wishList.length === 0 ? (
        <AbsoluteDiv>
          <Card>
            <CardBody>
              <p>Vous n'avez pas encore de liste d'envies.</p>
            </CardBody>
          </Card>
        </AbsoluteDiv>
      ) : (
        <div className="flex items-center flex-col gap-4 mt-5">
          {wishList.map(({ name, image, currency, price, id }) => (
            <WishCard
              key={id}
              name={name}
              image={image}
              currency={currency}
              price={price}
              id={id}
            />
          ))}
        </div>
      )}
      <Button
        isIconOnly
        color="danger"
        aria-label="Add"
        className="z-20 fixed right-5 bottom-5"
        onPress={() => setIsOpen(!isOpen)}
      >
        <AddIcon />
      </Button>
      {isOpen && (
        <FullDiv className="z-10 fixed">
          <Form
            title="Ajouter à la liste d'envies"
            button="Créer"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField name="name" type="text" label="Nom" />
            <FormField name="price" type="number" label="Prix" />
            <Select
              onSelectionChange={onSelectionChange}
              selectedValue={currency}
              items={currencies}
            />
            <Button as="label">
              Ajouter une image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Button>
          </Form>
        </FullDiv>
      )}
    </>
  )
}

export default Home
