import { fieldsAtom, formsAtom } from "@/web/atom/language"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import useHandleErrors from "@/web/hooks/useHandleErrors"
import useSession from "@/web/hooks/useSession"
import api from "@/web/services/api"
import AuthForm from "@/web/types/AuthForm"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useState } from "react"
import * as yup from "yup"

const initialValues = {
  email: "",
  password: "",
}

const SignUp = () => {
  const { handleError } = useHandleErrors()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { signIn } = useSession()
  const [forms] = useAtom(formsAtom)
  const [fields] = useAtom(fieldsAtom)

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email(forms.email.invalid)
      .required(forms.email.required),
    password: yup
      .string()
      .min(8, forms.password.length)
      .required(forms.password.required),
  })

  const signInMutation = useMutation({
    mutationFn: (credentials: AuthForm) => {
      setIsLoading(true)

      return api.post<string>("/sign-in", credentials)
    },
    onError: handleError,
    onSettled: () => {
      setIsLoading(false)
    },
    onSuccess: (response) => {
      void signIn(response.result)
      void router.push("/")
    },
  })

  const handleSubmit = ({ email, password }: AuthForm) => {
    signInMutation.mutate({ email, password })
  }

  return (
    <Page>
      <AbsoluteDiv>
        <Form
          initialValues={initialValues}
          validationSchema={signInSchema}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          title={forms.signIn.button}
          button={forms.signIn.button}
        >
          <FormField name="email" type="text" label={fields.email} />
          <FormField name="password" type="password" label={fields.password} />
        </Form>
      </AbsoluteDiv>
    </Page>
  )
}

export default SignUp
