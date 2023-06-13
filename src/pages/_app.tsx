import "@/styles/globals.css"
import AppBar from "@/web/components/AppBar"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <div className="flex flex-col">
          <AppBar />
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export default MyApp
