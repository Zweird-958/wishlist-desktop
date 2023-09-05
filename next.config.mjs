/** @type {import("next").NextConfig} */
import i18nConfig from "./next-i18next.config.js"

const config = {
  env: {
    NEXT_PUBLIC_I18N: i18nConfig.i18n,
  },
  output: "export",
}

export default config
