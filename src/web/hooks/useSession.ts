import { useEffect } from "react"
import { useSessionStore } from "../stores/session"
import useWishlist from "./useWishlist"

const useSession = () => {
  const { session, clearSession, setToken, signIn, ...sessionRouter } =
    useSessionStore((state) => state)

  const { setWishlist } = useWishlist()

  const signOut = async () => {
    setWishlist([])
    await clearSession()
  }

  useEffect(() => {
    if (!session) {
      void setToken()
    }
  }, [session, setToken])

  return { session, signOut, signIn, sessionRouter }
}

export default useSession
