import { User } from './user'

export interface LoginResponse {
  status: number
  message: string
  token: string
  expiration_date: string
  user: User
}

export interface LoginBody {
  phone: string
  password: string
}
