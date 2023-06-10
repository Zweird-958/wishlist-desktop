import config from "@/web/config"
import axios, { AxiosRequestConfig } from "axios"
import FormData from "../types/FormData"

type Method = "get" | "post" | "patch" | "delete"

const call =
  (method: Method) =>
  (
    path: string,
    data: null | FormData = null,
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

    return axios[method](
      path,
      ["get", "delete"].includes(method) ? opts : data,
      opts
    )
  }

const api = {
  post: call("post"),
  get: call("get"),
  patch: call("patch"),
  delete: call("delete"),
}

export default api
