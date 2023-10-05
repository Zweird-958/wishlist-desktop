import { create } from "zustand"
import User from "../types/User"

interface WishSharedState {
  usersShared: User[]
  setUsersShared: (users: User[]) => void
}

export const useWishlistSharedStore = create<WishSharedState>((set) => ({
  usersShared: [],
  setUsersShared: (users) => set({ usersShared: users }),
}))
