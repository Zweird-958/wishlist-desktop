import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import useHandleErrors from "@/web/hooks/useHandleErrors"
import api from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import { getStaticPaths, makeStaticProps } from "i18next-ssg/server"
import { localize, useTranslation } from "i18next-ssg"
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
  const { t } = useTranslation(["fields", "forms"])

  const signUpSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("forms:email.invalid"))
      .required(t("forms:email.required")),
    password: yup
      .string()
      .min(8, t("forms:password.length"))
      .required(t("forms:password.required")),
    username: yup
      .string()
      .min(3, t("forms:username.length"))
      .required(t("forms:username.required")),
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
      void router.push(localize("/sign-in"))
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
          title={t("forms:signUp.title")}
          button={t("forms:signUp.button")}
        >
          <FormField name="username" type="text" label={t("username")} />
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
