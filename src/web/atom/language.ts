import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import translation from "../translation"
import Locale from "../types/Locale"

const defaultLanguage: Locale = "en"

type Translation = (typeof translation)[Locale]

export const languageAtom = atomWithStorage<Locale>("language", defaultLanguage)

const currentTranslationAtom = atom<Translation>((get) => {
  const language = get(languageAtom)

  return translation[language]
})

export const commonAtom = atom((get) => get(currentTranslationAtom).common)
export const formsAtom = atom((get) => get(currentTranslationAtom).forms)
export const fieldsAtom = atom((get) => get(currentTranslationAtom).fields)
