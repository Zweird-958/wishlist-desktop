import { Button, Card, Container, Text } from "@nextui-org/react"
import { Form as FormFormik, Formik } from "formik"

const Form = (props) => {
  const { children, title, button, ...otherProps } = props

  return (
    <Container
      display="flex"
      alignItems="center"
      justify="center"
      css={{ minHeight: "100vh" }}
    >
      <Card css={{ mw: "420px", p: "20px" }}>
        <Text
          size={26}
          weight="bold"
          css={{
            as: "center",
            mb: "20px",
            color: "$primary",
          }}
        >
          {title}
        </Text>
        <Formik {...otherProps}>
          <FormFormik noValidate>
            {/* <FormField name="email" type="text" label="Email" />
            <FormField
              name="password"
              type="password"
              label="Mot de passe"
              isPassword={true}
            /> */}
            {children}
            <Button type="submit">{button}</Button>
          </FormFormik>
        </Formik>
      </Card>
    </Container>
  )
}

export default Form
