import axios from 'axios'
import Cookies from 'js-cookie'

import { BASE_URL } from '../../constants/base-url'
import { COOKIES } from '../../constants/cookies'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${Cookies.get(COOKIES.TOKEN)}`
    config.headers['X-Language'] = localStorage.getItem('i18nextLng')
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
        // Cookies.remove(COOKIES.TOKEN)
        return Promise.reject({
          message: error.response.data.message,
        })
      }

      return Promise.reject(error.response.data)
    }

    return Promise.reject({ message: error })
  }
)
