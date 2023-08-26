import "i18next"

import type common from "public/locales/fr/common.json"
import type fields from "public/locales/fr/fields.json"
import type forms from "public/locales/fr/forms.json"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common"
    resources: {
      common: typeof common
      fields: typeof fields
      forms: typeof forms
    }
  }
}
