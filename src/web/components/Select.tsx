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
  selectedValue: Filter | Sort
  items: Filter[] | Sort[]
  onSelectionChange: (value: Key | undefined) => void
}

const Select = (props: Props) => {
  const { selectedValue, onSelectionChange, items } = props
  const { t } = useTranslation("common")

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>{t([selectedValue])}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        // color={color}
        // selectedKeys={selected}
        selectionMode="single"
        onSelectionChange={(e) => onSelectionChange(Array.from(e)[0])}
      >
        {items.map((item: Filter | Sort) => (
          <DropdownItem key={item}>{t(item)}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default Select
