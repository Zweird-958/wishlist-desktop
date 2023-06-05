import config from "@/web/config"
import axios from "axios"
import deepmerge from "deepmerge"
import FormData from "../types/FormData"

const call =
  (method: string) =>
  (path: string, data: null | FormData = null, options = {}) => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    options.headers = deepmerge(
      options.headers,
      jwt ? { authorization: jwt } : {}
    )

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
