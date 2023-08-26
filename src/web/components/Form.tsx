import { Button, Card } from "@nextui-org/react"
import { Form as FormFormik, Formik, FormikConfig, FormikValues } from "formik"
import React from "react"

type Props<T> = {
  title: string
  button?: string
  isLoading?: boolean
  children: React.ReactNode
} & FormikConfig<T>

const Form = <T extends FormikValues>(props: Props<T>) => {
  const { children, title, button, isLoading, ...otherProps } = props

  return (
    <Card className="xs:w-[400px] py-8 w-full mx-3 bg-white z-10">
      <Formik<T> {...otherProps}>
        <FormFormik noValidate className="w-2/3 mx-auto gap-4 flex flex-col">
          <p className="text-center">{title}</p>
          {children}
          {button && (
            <Button
              type="submit"
              fullWidth
              color="primary"
              isLoading={isLoading}
            >
              {button}
            </Button>
          )}
        </FormFormik>
      </Formik>
    </Card>
  )
}

export default Form
