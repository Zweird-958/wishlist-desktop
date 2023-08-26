import i18nConfig from "@/../next-i18next.config.js"
import AbsoluteDiv from "@/web/components/AbsoluteDiv"
import Form from "@/web/components/Form"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import useHandleErrors from "@/web/hooks/useHandleErrors"
import api from "@/web/services/api"
import { useMutation } from "@tanstack/react-query"
import { type GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
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
  })

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
          <FormField name="email" type="text" label={t("email")} />
          <FormField name="password" type="password" label={t("password")} />
        </Form>
      </AbsoluteDiv>
    </Page>
  )
}

export default SignUp

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? i18nConfig.i18n.defaultLocale, [
      "common",
      "fields",
      "forms",
    ])),
  },
})
