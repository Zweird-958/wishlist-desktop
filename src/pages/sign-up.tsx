import { fieldsAtom, formsAtom } from "@/web/atom/language"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import useHandleErrors from "@/web/hooks/useHandleErrors"
import api from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useState } from "react"
import * as yup from "yup"

type SignUpMutation = {
  email: string
  password: string
  username: string
}

const initialValues = {
  email: "",
  password: "",
  username: "",
}

const SignUp = () => {
  const router = useRouter()
  const { handleError } = useHandleErrors()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [forms] = useAtom(formsAtom)
  const [fields] = useAtom(fieldsAtom)

  const signUpSchema = yup.object().shape({
    email: yup
      .string()
      .email(forms.email.invalid)
      .required(forms.email.required),
    password: yup
      .string()
      .min(8, forms.password.length)
      .required(forms.password.required),
    username: yup
      .string()
      .min(3, forms.username.length)
      .required(forms.username.required),
  })

  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUpMutation) => {
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

  const handleSubmit = ({ email, password, username }: SignUpMutation) => {
    signUpMutation.mutate({ email, password, username })
  }

  return (
    <Page>
      <AbsoluteDiv>
        <Form
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          title={forms.signUp.title}
          button={forms.signUp.button}
        >
          <FormField name="username" type="text" label={fields.username} />
          <FormField name="email" type="text" label={fields.email} />
          <FormField name="password" type="password" label={fields.password} />
        </Form>
      </AbsoluteDiv>
    </Page>
  )
}

export default SignUp
