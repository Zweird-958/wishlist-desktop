import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { setUserLocale, useLocaleSwitcher } from "i18next-ssg"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Store } from "tauri-plugin-store-api"
import config from "../config"

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

const localeMap: Record<Locale, string> = languages.reduce((_acc, language) => {
  return Object.assign(language, {
    [language.value]: language.name,
  })
}, {})

const store = new Store(".settings.dat")

const SelectLanguage = () => {
  const router = useRouter()
  const { value: currentLocale, options } = useLocaleSwitcher({ localeMap })

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0] as Language
  )

  useEffect(() => {
    const language = languages.find(
      (language) => language.value === currentLocale
    ) as Language
    setSelectedLanguage(language)
    void store.set(config.languageKey, language.value)
  }, [currentLocale])

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
        onSelectionChange={(e) => {
          if (typeof e !== "undefined" && Symbol.iterator in Object(e)) {
            const firstItem = Array.from(
              e as Iterable<unknown> | ArrayLike<unknown>
            )[0] as string

            if (currentLocale === firstItem) {
              return
            }

            setUserLocale(firstItem)
            void router.push(
              options.find((option) => option.locale === firstItem)
                ?.path as string
            )
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
