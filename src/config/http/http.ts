import axios from 'axios'
import Cookies from 'js-cookie'

export const http = axios.create({
  baseURL: 'https://113e-84-54-83-142.ngrok-free.app/admin',
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer 5|d4OpSjVVCICohFyhba2loDiV8wltqFjG5TYiilyze6837016`
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
        Cookies.remove('token')
        return Promise.reject({
          message: error.response.data.message,
        })
      }

      return Promise.reject(error.response.data)
    }

    return Promise.reject({ message: error })
  }
)
