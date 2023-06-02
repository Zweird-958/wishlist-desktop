import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"

type Props = {
  selectedValue: string
  // eslint-disable-next-line no-unused-vars
  onSelectionChange: any
  items: string[]
}

const Select = (props: Props) => {
  const { selectedValue, onSelectionChange, items } = props

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>{selectedValue}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        // color={color}
        // selectedKeys={selected}
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        {items.map((item: string) => (
          <DropdownItem key={item}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default Select
