import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { useAtom } from "jotai"
import { Key } from "react"
import { commonAtom } from "../atom/language"
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
  const [common] = useAtom(commonAtom)

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>
          {isFilter(selectedValue) || isSort(selectedValue)
            ? common[selectedValue]
            : selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        selectionMode="single"
        onSelectionChange={(e) => {
          if (typeof e !== "undefined" && Symbol.iterator in Object(e)) {
            const firstItem = Array.from(
              e as Iterable<unknown> | ArrayLike<unknown>
            )[0] as string
            onSelectionChange(firstItem)
          }
        }}
      >
        {items.map((item: Filter | Sort | string) => (
          <DropdownItem key={item}>
            {isFilter(item) || isSort(item) ? common[item] : item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default Select
