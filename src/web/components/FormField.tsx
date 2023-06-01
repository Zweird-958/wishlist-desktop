import { Input } from "@nextui-org/react"
import { useField } from "formik"

const FormField = (props) => {
  const { label, isPassword, ...otherProps } = props
  const [field, meta] = useField(otherProps)

  return (
    <>
      <Input
        label={label}
        color="secondary"
        variant="bordered"
        size="sm"
        radius="lg"
        fullWidth
        labelPlacement="inside"
        {...field}
        {...otherProps}
      />
      {meta.touched && meta.error ? (
        <p className="px-2 text-sm">{meta.error}</p>
      ) : null}
    </>
  )
}

export default FormField
