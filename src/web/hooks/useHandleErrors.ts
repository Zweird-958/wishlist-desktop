import { AxiosError } from "axios"
import useSession from "./useSession"
import toast from "react-hot-toast"

type ApiError = {
  error: string
}

const useHandleErrors = () => {
  const { signOut } = useSession()

  const handleError = (error: AxiosError<ApiError>) => {
    const { response } = error

    if (response) {
      const {
        status,
        data: { error: errorMessage },
      } = response

      toast.error(errorMessage)

      if (status == 403) {
        void signOut()
      }
    }
  }

  return { handleError }
}
export default useHandleErrors
