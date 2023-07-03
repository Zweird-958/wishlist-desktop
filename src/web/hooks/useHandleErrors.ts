import { AxiosError } from "axios"
import useSession from "./useSession"

const useHandleErrors = () => {
  const { signOut } = useSession()

  const handleError = (error: AxiosError) => {
    const { response } = error

    if (response) {
      const { status } = response

      if (status === 403) {
        void signOut()
      }
    }
  }

  return { handleError }
}
export default useHandleErrors
