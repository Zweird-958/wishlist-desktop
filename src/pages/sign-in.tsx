import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import useHandleErrors from "@/web/hooks/useHandleErrors"
import useSession from "@/web/hooks/useSession"
import api from "@/web/services/api"
import AuthForm from "@/web/types/AuthForm"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
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

const SignUp = () => {
  const { handleError } = useHandleErrors()

  const signInMutation = useMutation({
    mutationFn: (credentials: AuthForm) => {
      return api.post<string>("/sign-in", credentials)
    },
    onError: handleError,
  })

  const router = useRouter()
  const { signIn } = useSession()

  const handleSubmit = ({ email, password }: AuthForm) => {
    signInMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          void signIn(response.result)
          void router.push("/")
        },
      }
    )
  }

  return (
    <AbsoluteDiv>
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
    </AbsoluteDiv>
  )
}

export default SignUp
