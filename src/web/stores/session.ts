import jsonwebtoken from "jsonwebtoken"
import { create } from "zustand"
import config from "../config"

type Session = {
  payload: {
    id: number
  }
}

type SignInResponse = {
  result: string
}

interface SessionState {
  session: Session | null
  setSession: (session: Session) => void
  signIn: (response: SignInResponse) => void
  signOut: () => void
  setToken: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  signIn: (response: SignInResponse) => {
    const { result: jwt } = response

    localStorage.setItem(config.session.localStorageKey, jwt)
    set({ session: jsonwebtoken.decode(jwt).payload })
  },
  signOut: () => {
    localStorage.removeItem(config.session.localStorageKey)
    set({ session: null })
  },
  setToken: () => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (jwt) {
      set({ session: jsonwebtoken.decode(jwt).payload })

      return
    }
  },
}))
