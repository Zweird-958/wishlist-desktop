import "@/styles/globals.css"
import { AppProps } from "next/app"
import AppBar from "@/web/components/AppBar"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <div className="flex flex-col">
          <Toaster />
          <AppBar />
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export default MyApp
