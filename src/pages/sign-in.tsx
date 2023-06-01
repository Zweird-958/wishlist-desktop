import AppContext from "@/web/components/AppContext"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import { useContext } from "react"
import * as yup from "yup"

const initialValues = {
  email: "",
  password: "",
}

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Veuillez entrer un email valide")
    .required("Veuillez entrer un email"),
  password: yup
    .string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères")
    .required("Veuillez entrer un mot de passe"),
})

type Values = {
  email: string
  password: string
}

const SignUp = () => {
  const {
    actions: { signIn },
  } = useContext(AppContext)

  const handleSubmit = async ({ email, password }: Values) => {
    const err = await signIn(email, password)

    if (err) {
      console.log("Invalid credentials")
    }
  }

  return (
    <Form
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
      title="Connexion"
      button="Se connecter"
    >
      <FormField name="email" type="text" label="Email" />
      <FormField name="password" type="password" label="Mot de passe" />
    </Form>
  )
}

export default SignUp
