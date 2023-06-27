import jsonwebtoken from "jsonwebtoken"
import { create } from "zustand"
import config from "../config"
import { Store } from "tauri-plugin-store-api"

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

const store = new Store(".settings.dat")

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  signIn: async (response: string) => {
    const jwt = response

    await store.set(config.session.localStorageKey, jwt)
    await store.save()

    const payload = getPayload(jwt)

    set({ session: payload })
  },
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  signOut: async () => {
    await store.set(config.session.localStorageKey, null)
    await store.save()
    set({ session: null })
  },
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setToken: async () => {
    const jwt: string | null = await store.get(config.session.localStorageKey)

    if (jwt) {
      const payload = getPayload(jwt)
      set({ session: payload })

      return
    }
  },
}))
