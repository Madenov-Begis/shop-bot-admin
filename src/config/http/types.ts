interface Response {
  statusCode: number
}

export interface ResponseWithPayload<T> extends Response {
  data: T
}

export interface ResponseWithData<T> extends ResponseWithPayload<T> {
  meta: {
    total: number
    per_page: number
  }
}

export interface HTTPError extends Response {
  message: string
  errors?: ValidationsError
}

export interface ValidationsError {
  [key: string]: string[]
}
