import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { useAtom } from "jotai"
import { useMemo } from "react"
import { languageAtom } from "../atom/language"
import Locale from "../types/Locale"

type Language = {
  name: string
  value: string
  flag: string
}

const languages: Language[] = [
  {
    name: "France",
    value: "fr",
    flag: "🇫🇷",
  },
  {
    name: "English",
    value: "en",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  },
].sort((a, b) => a.name.localeCompare(b.name))

const SelectLanguage = () => {
  const [language, setLanguage] = useAtom(languageAtom)

  const selectedLanguage = useMemo<Language>(() => {
    return (
      languages.find((currentLanguage) => currentLanguage.value === language) ||
      (languages[0] as Language)
    )
  }, [language])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>
          {selectedLanguage.flag} - {selectedLanguage.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Actions"
        selectionMode="single"
        onAction={(key) => {
          setLanguage(key as Locale)
        }}
      >
        {languages.map((language) => (
          <DropdownItem key={language.value}>
            {language.flag} - {language.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default SelectLanguage
