import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

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
  const router = useRouter()
  const { i18n } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0] as Language
  )

  useEffect(() => {
    const language = languages.find(
      (language) => language.value === i18n.language
    ) as Language
    setSelectedLanguage(language)
  }, [i18n.language])

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
        onSelectionChange={async (e) => {
          if (typeof e !== "undefined" && Symbol.iterator in Object(e)) {
            const firstItem = Array.from(
              e as Iterable<unknown> | ArrayLike<unknown>
            )[0] as string
            await router.push(router.asPath, router.asPath, {
              locale: firstItem,
            })
          }
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
