import jsonwebtoken from "jsonwebtoken"
import { create } from "zustand"
import config from "../config"

type Session = {
  payload: {
    id: number
  }
}

const getPayload = (jwt: string) => {
  const payload = jsonwebtoken.decode(jwt) as jsonwebtoken.JwtPayload

  return payload
}

interface SessionState {
  session: Session | null | jsonwebtoken.JwtPayload
  setSession: (session: Session) => void
  signIn: (response: string) => void
  signOut: () => void
  setToken: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  signIn: (response: string) => {
    const jwt = response

    localStorage.setItem(config.session.localStorageKey, jwt)
    const payload = getPayload(jwt)

    set({ session: payload })
  },
  signOut: () => {
    localStorage.removeItem(config.session.localStorageKey)
    set({ session: null })
  },
  setToken: () => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (jwt) {
      const payload = getPayload(jwt)
      set({ session: payload })

      return
    }
  },
}))
