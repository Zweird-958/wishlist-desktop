import { create } from "zustand"
import User from "../types/User"
import Wish from "../types/Wish"
import Sort from "../types/Sort"
import { SORTS } from "./wish"

interface WishSharedState {
  usersShared: User[]
  setUsersShared: (users: User[]) => void
  fetchingWishlist: boolean
  setFetchingWishlist: (fetching: boolean) => void
  currentWishlistShared: Wish[] | null
  setCurrentWishlistShared: (wishlist: Wish[] | null) => void
  sort: Sort
  sortWishlist: (sort: Sort) => void
}

export const useWishlistSharedStore = create<WishSharedState>((set) => ({
  usersShared: [],
  setUsersShared: (users) => set({ usersShared: users }),
  fetchingWishlist: false,
  setFetchingWishlist: (fetching) => set({ fetchingWishlist: fetching }),
  currentWishlistShared: null,
  setCurrentWishlistShared: (wishlist) =>
    set({ currentWishlistShared: wishlist }),
  sort: SORTS[0] as Sort,
  sortWishlist: (sort: Sort) => {
    const { currentWishlistShared, setCurrentWishlistShared } =
      useWishlistSharedStore.getState()
    set({ sort })

    if (!currentWishlistShared) {
      return
    }

    if (sort === SORTS[0]) {
      setCurrentWishlistShared(
        currentWishlistShared.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      )
    } else if (sort === SORTS[1]) {
      setCurrentWishlistShared(
        currentWishlistShared.sort((a, b) => a.price - b.price)
      )
    } else {
      setCurrentWishlistShared(
        currentWishlistShared.sort((a, b) => b.price - a.price)
      )
    }
  },
}))
