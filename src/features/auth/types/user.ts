export interface User {
  address: null | string
  avatar: null | string
  birthday: null | string
  email: null | string
  name: string
  patronymic: null | string
  permissions: string[]
  phone: string
  pin: null | string
  roles: string[]
  states: {
    phone_verified: boolean
    active: boolean
  }
  surname: null | string
}
