import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import AddIcon from "@/web/components/AddIcon"
import AppContext from "@/web/components/AppContext"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import WishCard from "@/web/components/WishCard"
import config from "@/web/config"
import api from "@/web/services/api"
import { Button, Card, CardBody } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import * as yup from "yup"

const initialValues = {
  name: "",
  currency: "",
  price: 0,
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Veuillez entrer un nom"),
  price: yup.number().required("Veuillez entrer un prix"),
})

const Home = () => {
  const [wishList, setWishList] = useState([])
  const {
    state: { session },
  } = useContext(AppContext)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [image, setImage] = useState(null)
  // const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: true })

  useEffect(() => {
    ;(async () => {
      if (!session) {
        router.push("/")
      }

      try {
        const {
          data: { result },
        } = await api.get("/wish")

        setWishList(result)
      } catch (err) {
        return
      }
    })()
  }, [router, session])

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
      console.log(result)

      // setWishList((prev) => [...prev, result])
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
              image={`${config.api.baseURL}/${image}`}
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
        className="z-10 absolute bottom-5 right-5"
        onPress={() => setIsOpen(!isOpen)}
      >
        <AddIcon />
      </Button>
      {isOpen && (
        <AbsoluteDiv className="z-0">
          <Form
            title="Ajouter à la liste d'envies"
            button="Créer"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField name="name" type="text" label="Nom" />
            <FormField name="price" type="text" label="Prix" />
            <FormField name="currency" type="text" label="Monnaie" />
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
        </AbsoluteDiv>
      )}
    </>
  )
}

export default Home
