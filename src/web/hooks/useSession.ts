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

  if (!session) {
    void setToken()
  }

  return { session, signOut, signIn, sessionRouter }
}

export default useSession
