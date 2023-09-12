import { useEffect } from "react"
import { useSessionStore } from "../stores/session"
import { useWishStore } from "../stores/wish"

const useSession = () => {
  const { session, clearSession, setToken, signIn, ...sessionRouter } =
    useSessionStore()

  const { setWishlist } = useWishStore()

  const signOut = async () => {
    await clearSession()
    setWishlist([])
  }

  // const previousValue = useRef(session)

  // if (previousValue.current !== session && session) {
  //   previousValue.current = session
  //   void setToken()
  // }

  useEffect(() => {
    if (!session) {
      void setToken()
    }
  }, [session, setToken])

  return { session, signOut, signIn, sessionRouter }
}

export default useSession
