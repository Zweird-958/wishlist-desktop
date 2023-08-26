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

const isFilter = (value: string): value is Filter => {
  return value === "all" || value === "bought" || value === "notBought"
}

const isSort = (value: string): value is Sort => {
  return (
    value === "date" ||
    value === "priceAscending" ||
    value === "priceDescending"
  )
}

const Select = (props: Props) => {
  const { selectedValue, onSelectionChange, items } = props
  const { t } = useTranslation("common")

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>
          {isFilter(selectedValue) || isSort(selectedValue)
            ? t(selectedValue)
            : selectedValue}
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
            {isFilter(item) || isSort(item) ? t(item) : item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default Select
