import { create } from "zustand"
import User from "../types/User"

interface WishSharedState {
  wishlistShared: User[]
  setWishlistShared: (users: User[]) => void
}

export const useWishlistSharedStore = create<WishSharedState>((set) => ({
  wishlistShared: [],
  setWishlistShared: (users) => set({ wishlistShared: users }),
}))
