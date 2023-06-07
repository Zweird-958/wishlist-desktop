import { nextui } from "@nextui-org/react"
import { type Config } from "tailwindcss"

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config
