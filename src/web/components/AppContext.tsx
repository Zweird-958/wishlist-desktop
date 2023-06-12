import config from "@/web/config"
import api from "@/web/services/api"
import { createContext, useEffect, useState } from "react"
import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"
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
  const [wishList, setWishList] = useState<Wish[]>([])
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    try {
      const { result: jwt } = await api.post("/sign-in", { email, password })

      localStorage.setItem(config.session.localStorageKey, jwt)
      setSession(jsonwebtoken.decode(jwt).payload)

      router.push("/")
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const signOut = () => {
    localStorage.removeItem(config.session.localStorageKey)
    setSession(null)
  }

  const getWishList = async () => {
    try {
      const {
        data: { result },
      } = await api.get("/wish")

      setWishList(result)
    } catch (err) {
      return
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        await api.get("/session")

        const jwt = localStorage.getItem(config.session.localStorageKey)

        if (jwt) {
          setSession(jsonwebtoken.decode(jwt).payload)

          return
        }
      } catch (err) {
        return signOut()
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppContext.Provider
      value={{
        state: { session, wishList },
        actions: { signIn, signOut, getWishList },
      }}
      {...props}
    />
  )
}

export default AppContext
