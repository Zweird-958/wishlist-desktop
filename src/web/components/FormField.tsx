import { Input } from "@nextui-org/react"
import { useField } from "formik"

type Props = {
  label: string
  name: string
  type: string
}

const FormField = (props: Props) => {
  const { label, ...otherProps } = props
  const [field, meta] = useField(otherProps)

  return (
    <Input
      label={label}
      color="primary"
      variant="bordered"
      size="sm"
      radius="lg"
      fullWidth
      labelPlacement="inside"
      {...field}
      {...otherProps}
      errorMessage={meta.touched && meta.error}
    />
  )
}

export default FormField
