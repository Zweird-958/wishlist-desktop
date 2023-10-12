import User from "./User"

type ApiError = {
  error: string
}

type WishlistShareResponse = {
  message: string
  user: User
}

export type { ApiError, WishlistShareResponse }
