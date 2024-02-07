export interface User {
  surname: null | string
  name: string
  patronymic: null | string
  email: null | string
  phone: string
  pin: null | string
  birthday: null | string
  address: null | string
  avatar: null | string
  states: {
    phone_verified: boolean
    active: boolean
  }
  roles: string[]
  permissions: string[]
}
