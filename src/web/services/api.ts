import config from "@/web/config"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import FormData from "../types/FormData"
import AuthForm from "../types/AuthForm"

type Method = "get" | "post" | "patch" | "delete"

const call =
  (method: Method) =>
  async (
    path: string,
    data: null | FormData | AuthForm = null,
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

    const res = await axios[method](
      path,
      ["get", "delete"].includes(method) ? opts : data,
      opts
    )

    return res.data as AxiosResponse
  }

const api = {
  post: call("post"),
  get: call("get"),
  patch: call("patch"),
  delete: call("delete"),
}

export default api
