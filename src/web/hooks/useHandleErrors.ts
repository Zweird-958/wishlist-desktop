import { AxiosError } from "axios"
import useSession from "./useSession"
import toast from "react-hot-toast"

const useHandleErrors = () => {
  const { signOut } = useSession()

  const handleError = (error: AxiosError) => {
    const { response } = error

    if (response) {
      const { status } = response

      if (status === 401) {
        toast.error("Identifiants incorrects.")
      } else if (status === 403) {
        toast.error("Votre session a expiré, veuillez vous reconnecter.")
        void signOut()
      } else if (status === 404) {
        toast.error("La ressource demandée n'a pas été trouvée.")
      } else if (status === 500) {
        toast.error("Une erreur interne est survenue. Veuillez réessayer.")
      }
    }
  }

  return { handleError }
}
export default useHandleErrors
