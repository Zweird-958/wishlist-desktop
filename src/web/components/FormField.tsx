import { Input, Spacer, Text } from "@nextui-org/react"
import { useField } from "formik"

const FormField = (props) => {
  const { label, isPassword, ...otherProps } = props
  const [field, meta] = useField(otherProps)

  const options = {
    clearable: true,
    bordered: true,
    fullWidth: true,
    color: "primary",
    size: "lg",
    placeholder: label,
    ...field,
    ...props,
  }

  return (
    <>
      {isPassword ? <Input.Password {...options} /> : <Input {...options} />}

      {meta.touched && meta.error ? (
        <>
          <Spacer y={0.3} />
          <Text color="error" css={{ px: "$5" }}>
            {meta.error}
          </Text>
        </>
      ) : null}
      <Spacer y={1} />
    </>
  )
}

export default FormField
