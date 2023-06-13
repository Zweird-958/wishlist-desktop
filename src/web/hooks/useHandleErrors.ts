import useSession from "./useSession"

const useHandleErrors = () => {
  const { signOut } = useSession()

  const handleError = (error) => {
    const {
      response: { status },
    } = error

    if (status === 403) {
      signOut()
    }
  }

  return { handleError }
}

export default useHandleErrors
