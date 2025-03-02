export interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  phone: string
  telegram_id: string
  locale: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token: string
}
