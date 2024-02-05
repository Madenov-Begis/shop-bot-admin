import axios from 'axios'
import Cookies from 'js-cookie'

export const http = axios.create({
  baseURL: 'http://192.168.0.191:8000/api/admin',
  headers: {
    'Accept': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer 10|xMDDsjQqXlS6uNGC1QELnpuBWjmTb0cI1zqx2Y0lfe9aa8bc`
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
