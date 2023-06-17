import { Button, Card, Spinner } from "@nextui-org/react"
import { Form as FormFormik, Formik } from "formik"
import React from "react"
import Wish from "../types/Wish"
import InitialValues from "../types/InitialValues"
import AuthForm from "../types/AuthForm"

type ValidationSchema = {
  name: string
  price: number
  link: string
}

type AuthUndefined = {
  email: undefined
  password: undefined
}

type Props = {
  children: React.ReactNode
  title: string
  button?: string
  initialValues: Wish | InitialValues | AuthForm
  validationSchema: ValidationSchema | AuthForm | AuthUndefined
  onSubmit: (values: InitialValues | AuthForm) => void
  isLoading?: boolean
}

const Form = (props: Props) => {
  const { children, title, button, isLoading, ...otherProps } = props

  return (
    <Card className="xs:w-[400px] py-8 w-full mx-3 bg-white z-10">
      {isLoading ? (
        <Spinner size="md" color="primary" className="py-8" />
      ) : (
        <Formik {...otherProps}>
          <FormFormik noValidate className="w-2/3 mx-auto gap-4 flex flex-col">
            <p className="text-center">{title}</p>
            {children}
            {button && (
              <Button type="submit" fullWidth color="primary">
                {button}
              </Button>
            )}
          </FormFormik>
        </Formik>
      )}
    </Card>
  )
}

export default Form
