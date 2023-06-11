import "@/styles/globals.css"
import AppBar from "@/web/components/AppBar"
import { AppContextProvider } from "@/web/components/AppContext"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <AppContextProvider>
          <div className="flex flex-col">
            <AppBar />
            <Component {...pageProps} />
          </div>
        </AppContextProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export default MyApp
