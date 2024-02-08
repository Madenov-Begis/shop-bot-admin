import axios from 'axios'
import Cookies from 'js-cookie'

import { BASE_URL } from '@/shared/constants/base-url'
import { COOKIES } from '@/shared/constants/cookies'
import { LOCALE_STORAGE } from '@/shared/constants/local-storage'

import { languages, DEFAULT_LANGUAGE } from '../languages'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    const detectedLanguage = localStorage
      .getItem(LOCALE_STORAGE.I18NEXT_LNG)
      ?.slice(0, 2)
      .toLowerCase()

    const foundLanguage = Object.keys(languages).find(
      (language) => language === detectedLanguage
    )

    config.headers.Authorization = `Bearer ${Cookies.get(COOKIES.TOKEN)}`
    config.headers['X-Language'] = foundLanguage || DEFAULT_LANGUAGE
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
        Cookies.remove(COOKIES.TOKEN)
        return Promise.reject({
          message: error.response.data.message,
        })
      }

      return Promise.reject(error.response.data)
    }

    return Promise.reject({ message: error.message || 'Unknown error' })
  }
)
