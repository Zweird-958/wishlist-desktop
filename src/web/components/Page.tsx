import { Toaster } from "react-hot-toast"
import AppBar from "./AppBar"

type Props = {
  children: React.ReactNode
}

const Page = (props: Props) => {
  const { children } = props

  return (
    <div className="flex flex-col">
      <Toaster />
      <AppBar />
      {children}
    </div>
  )
}

export default Page
