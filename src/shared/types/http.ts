interface Response {
  status: number
}

export interface ResponseWithData<T> extends Response {
  data: T
}

export interface ResponseWithMessage {
  message: string
}

export interface ResponseWithPagination<T> {
  data: T
  count: number
  current_page: number
  last_page: number
  next_page: number
  prev_page: number | null
}

export interface HTTPError {
  message: string
}
