import config from "@/web/config"
import api from "@/web/services/api"
import { useQuery } from "@tanstack/react-query"
import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"
import { createContext, useState } from "react"
import Wish from "../types/Wish"

type Session = {
  id: number
}

type AppContextType = {
  state: {
    session: { payload: Session }
    wishList: Wish[]
  }
  actions: {
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => void
    getWishList: () => Promise<void>
    updateWishList: (newWish: Wish) => void
  }
}

const AppContext = createContext<AppContextType>()

export const AppContextProvider = (props) => {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    try {
      const { result: jwt } = await api.post("/sign-in", { email, password })

      localStorage.setItem(config.session.localStorageKey, jwt)
      setSession(jsonwebtoken.decode(jwt).payload)

      router.push("/")
    } catch (err) {
      return err
    }
  }

  const signOut = () => {
    localStorage.removeItem(config.session.localStorageKey)
    setSession(null)
  }

  useQuery({
    queryKey: ["session"],
    queryFn: () => api.get("/session"),
    onError: () => signOut(),
    onSuccess: () => {
      const jwt = localStorage.getItem(config.session.localStorageKey)

      if (jwt) {
        setSession(jsonwebtoken.decode(jwt).payload)

        return
      }
    },
  })

  return (
    <AppContext.Provider
      value={{
        state: { session },
        actions: { signIn, signOut },
      }}
      {...props}
    />
  )
}

export default AppContext
