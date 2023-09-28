import { Toaster } from "react-hot-toast"
import AppBar from "./AppBar"
import { semanticColors } from "@nextui-org/theme"
import { useTheme } from "next-themes"
import { AvailableThemes, ThemeContentColors } from "../types/Theme"

type Props = {
  children: React.ReactNode
}

const Page = (props: Props) => {
  const { children } = props
  const { resolvedTheme } = useTheme()
  const defaultTheme = "light"

  const theme =
    resolvedTheme && resolvedTheme !== "system"
      ? (resolvedTheme as AvailableThemes)
      : defaultTheme

  return (
    <div className="flex flex-col">
      <Toaster
        toastOptions={{
          className: "toast",
          style: {
            backgroundColor: (
              semanticColors[theme].content1 as ThemeContentColors
            ).DEFAULT,
            color: (semanticColors[theme].content1 as ThemeContentColors)
              .foreground,
          },
        }}
      />
      <AppBar />
      {children}
    </div>
  )
}

export default Page
