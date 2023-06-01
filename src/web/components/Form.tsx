import { Button, Card } from "@nextui-org/react"
import { Form as FormFormik, Formik } from "formik"

const Form = (props) => {
  const { children, title, button, ...otherProps } = props

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="lg:w-1/5 sm:w-3/4 py-8 w-full mx-3 sm:mx-0">
        <Formik {...otherProps}>
          <FormFormik noValidate className="w-2/3 mx-auto gap-4 flex flex-col">
            <p className="text-center">{title}</p>
            {children}
            <Button type="submit" fullWidth color="primary">
              {button}
            </Button>
          </FormFormik>
        </Formik>
      </Card>
    </div>
  )
}

export default Form
