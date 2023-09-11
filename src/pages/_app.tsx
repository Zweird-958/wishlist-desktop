import "@/styles/globals.css"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppProps } from "next/app"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export default MyApp
