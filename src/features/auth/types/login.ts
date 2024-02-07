export interface LoginResponse {
  status: number
  message: string
  token: string
  expiration_date: string
}

export interface LoginBody {
  phone: string
  password: string
}
