import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { useTranslation } from "next-i18next"
import { Key } from "react"
import Filter from "../types/Filter"
import Sort from "../types/Sort"

type Props = {
  selectedValue: Filter | Sort | string
  items: Filter[] | Sort[] | string[]
  onSelectionChange: (value: Key | undefined) => void
}

const Select = (props: Props) => {
  const { selectedValue, onSelectionChange, items } = props
  const { t } = useTranslation("common")

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>
          {typeof selectedValue === "string"
            ? selectedValue
            : t([selectedValue])}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        // color={color}
        // selectedKeys={selected}
        selectionMode="single"
        onSelectionChange={(e) => onSelectionChange(Array.from(e)[0])}
      >
        {items.map((item: Filter | Sort | string) => (
          <DropdownItem key={item}>
            {typeof item === "string" ? item : t(item)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default Select
