import "@/styles/globals.css"
import { AppContextProvider } from "@/web/components/AppContext"

import { NextUIProvider } from "@nextui-org/react"

const MyApp = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </NextUIProvider>
  )
}

export default MyApp
