import "@/styles/globals.css"

import { NextUIProvider } from "@nextui-org/react"

const MyApp = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
