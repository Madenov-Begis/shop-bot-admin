import axios from 'axios'
import Cookies from 'js-cookie'

import { BASE_URL } from '@/shared/constants/base-url'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: false,
})

http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${Cookies.get('Authentication')}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('Authentication')
        return Promise.reject({
          message: error.response.data.message,
        })
      }

      return Promise.reject(error.response.data)
    }

    return Promise.reject({ message: error.message || 'Unknown error' })
  }
)
