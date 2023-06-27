import { useEffect } from "react"
import { useSessionStore } from "../stores/session"

const useSession = () => {
  const { session, signOut, setToken, signIn, ...sessionRouter } =
    useSessionStore((state) => state)

  useEffect(() => {
    if (!session) {
      setToken()
    }
  }, [session, setToken])

  return { session, signOut, signIn, sessionRouter }
}

export default useSession
