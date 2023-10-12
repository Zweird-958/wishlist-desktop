import { create } from "zustand"
import User from "../types/User"

interface UsersSharedWithState {
  usersSharedWith: User[]
  setUsersSharedWith: (users: User[]) => void
  addUserSharedWith: (user: User) => void
  removeUserSharedWith: (user: User) => void
}

export const useUsersSharedWithStore = create<UsersSharedWithState>((set) => ({
  usersSharedWith: [],
  setUsersSharedWith: (users) => set({ usersSharedWith: users }),
  addUserSharedWith: (user) =>
    set((state) => ({ usersSharedWith: [...state.usersSharedWith, user] })),
  removeUserSharedWith: (user) =>
    set((state) => ({
      usersSharedWith: state.usersSharedWith.filter((u) => u.id !== user.id),
    })),
}))
