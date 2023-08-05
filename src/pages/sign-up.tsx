import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import useHandleErrors from "@/web/hooks/useHandleErrors"
import api from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useState } from "react"
import * as yup from "yup"

type SignUnMutation = {
  email: string
  password: string
}

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
  const router = useRouter()
  const { handleError } = useHandleErrors()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUnMutation) => {
      setIsLoading(true)

      return api.post("/sign-up", credentials)
    },
    onError: handleError,
    onSettled: () => {
      setIsLoading(false)
    },
    onSuccess: () => {
      void router.push("/sign-in")
    },
  })

  const handleSubmit = ({ email, password }: SignUnMutation) => {
    signUpMutation.mutate({ email, password })
  }

  return (
    <AbsoluteDiv>
      <Form
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        title="Inscription"
        button="S'inscrire"
      >
        <FormField name="email" type="text" label="Email" />
        <FormField name="password" type="password" label="Mot de passe" />
      </Form>
    </AbsoluteDiv>
  )
}

export default SignUp
