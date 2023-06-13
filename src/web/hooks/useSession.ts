import { useQuery } from "@tanstack/react-query"
import api from "../services/api"
import { useSessionStore } from "../stores/session"

const useSession = () => {
  const { session, signOut, setToken, signIn, ...sessionRouter } =
    useSessionStore((state) => state)

  useQuery({
    queryKey: ["session"],
    queryFn: () => api.get("/session"),
    onError: () => signOut(),
    onSuccess: () => setToken(),
  })

  return { session, signOut, signIn, sessionRouter }
}

export default useSession
