import { Button, Card, Spinner } from "@nextui-org/react"
import { Form as FormFormik, Formik } from "formik"
import React from "react"
import Wish from "../types/Wish"
import InitialValues from "../types/InitialValues"

type ValidationSchema = {
  name: string
  price: number
  link: string
}

type Props = {
  children: React.ReactNode
  title: string
  button?: string
  initialValues: Wish | InitialValues
  validationSchema: ValidationSchema
  onSubmit: (values: InitialValues) => void
  isLoading?: boolean
}

const Form = (props: Props) => {
  const { children, title, button, isLoading, ...otherProps } = props

  return (
    <Card className="lg:w-1/5 sm:w-3/4 py-8 w-full mx-3 sm:mx-0 bg-white z-10">
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
