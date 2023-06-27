import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownMenuProps,
  DropdownTrigger,
} from "@nextui-org/react"

type Props = {
  selectedValue: string
  items: string[]
} & Pick<DropdownMenuProps, "onSelectionChange">

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
