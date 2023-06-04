import config from "@/web/config"
import api from "@/web/services/api"
import { createContext, useEffect, useState } from "react"
import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    try {
      const {
        data: { result: jwt },
      } = await api.post("/sign-in", { email, password })

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

    router.push("/sign-in")
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
      value={{ state: { session }, actions: { signIn, signOut } }}
      {...props}
    />
  )
}

export default AppContext
