import config from "@/web/config"
import axios, { AxiosRequestConfig } from "axios"
import { Store } from "tauri-plugin-store-api"

type Method = "get" | "post" | "patch" | "delete"
type ApiResult<T> = { result: T }

const store = new Store(".settings.dat")

const call =
  (method: Method) =>
  async <T>(
    path: string,
    data: unknown = null,
    options: AxiosRequestConfig = {}
  ) => {
    const jwt: string | null = await store.get(config.session.localStorageKey)
    const locale: string | null = await store.get(config.languageKey)

    if (jwt) {
      options.headers = {
        authorization: jwt,
      }
    }

    options.headers = {
      ...options.headers,
      "Accept-Language": locale,
    }

    const opts = {
      baseURL: config.api.baseURL,
      ...options,
    }

    const res = await axios[method]<ApiResult<T>>(
      path,
      ["get", "delete"].includes(method) ? opts : data,
      opts
    )

    return res.data
  }

const api = {
  post: call("post"),
  get: call("get"),
  patch: call("patch"),
  delete: call("delete"),
}

export default api
