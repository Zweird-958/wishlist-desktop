import config from "@/web/config"
import axios, { AxiosRequestConfig } from "axios"

type Method = "get" | "post" | "patch" | "delete"
type ApiResult<T> = { result: T }

const call =
  (method: Method) =>
  async <T>(
    path: string,
    data: unknown = null,
    options: AxiosRequestConfig = {}
  ) => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (jwt) {
      options.headers = {
        authorization: jwt,
      }
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
