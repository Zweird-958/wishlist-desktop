import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import useHandleErrors from "@/web/hooks/useHandleErrors"
import useSession from "@/web/hooks/useSession"
import api from "@/web/services/api"
import AuthForm from "@/web/types/AuthForm"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useState } from "react"
import * as yup from "yup"
import { getStaticPaths, makeStaticProps } from "i18next-ssg/server"
import { localize, useTranslation } from "i18next-ssg"

const initialValues = {
  email: "",
  password: "",
}

const SignUp = () => {
  const { handleError } = useHandleErrors()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { signIn } = useSession()
  const { t } = useTranslation(["fields", "forms"])

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("forms:email.invalid"))
      .required(t("forms:email.required")),
    password: yup
      .string()
      .min(8, t("forms:password.length"))
      .required(t("forms:password.required")),
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
      void router.push(localize("/"))
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
          title={t("forms:signIn.button")}
          button={t("forms:signIn.button")}
        >
          <FormField name="email" type="text" label={t("email")} />
          <FormField name="password" type="password" label={t("password")} />
        </Form>
      </AbsoluteDiv>
    </Page>
  )
}

export default SignUp

const getStaticProps = makeStaticProps(["common", "fields", "forms"])
export { getStaticPaths, getStaticProps }
