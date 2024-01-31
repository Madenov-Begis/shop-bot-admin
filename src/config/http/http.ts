import axios from 'axios'
import Cookies from 'js-cookie'

export const http = axios.create({
  baseURL: 'http://192.168.0.195:8000/api/admin',
  headers: {
    'Accept': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer 7|muQB1LiWy32upivTuJPOwCenGjd4B8xEu5lqDh8q6592e187`
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
