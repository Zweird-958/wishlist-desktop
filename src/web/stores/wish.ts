import { create } from "zustand"
import Wish from "../types/Wish"

export const SORTS = ["Date", "Prix croissant", "Prix décroissant"]

interface WishState {
  wishlist: Wish[]
  setWishlist: (wishlist: Wish[]) => void
  addWish: (wish: Wish) => void
  removeWish: (wish: Wish) => void
  updateWish: (wish: Wish) => void
  sort: string
  sortWishlist: (sort: string) => void
}

export const useWishStore = create<WishState>((set) => ({
  wishlist: [],
  setWishlist: (wishlist) => set({ wishlist }),
  addWish: (wish) => set((state) => ({ wishlist: [...state.wishlist, wish] })),
  removeWish: (wish) =>
    set((state) => ({
      wishlist: state.wishlist.filter((w) => w.id !== wish.id),
    })),
  updateWish: (wish) => {
    const { wishlist, setWishlist } = useWishStore.getState()
    setWishlist(
      wishlist.map((w) => {
        if (w.id === wish.id) {
          return wish
        }

        return w
      })
    )
  },
  sort: SORTS[0] as string,
  sortWishlist: (sort) => {
    const { wishlist, setWishlist } = useWishStore.getState()
    set({ sort })

    if (sort === SORTS[0]) {
      setWishlist(
        wishlist.sort(
          (a, b) => new Date(a.createdAt).getSeconds() - new Date(b.createdAt).getSeconds()
        )
      )
    } else if (sort === SORTS[1]) {
      setWishlist(wishlist.sort((a, b) => a.price - b.price))
    } else {
      setWishlist(wishlist.sort((a, b) => b.price - a.price))
    }
  },
}))
