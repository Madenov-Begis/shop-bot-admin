import Cookies from 'js-cookie'

export const CheckAuth = async () => {
  const token = Cookies.get('token')

  if (token) {
    return true
  } else {
    return false
  }
}
