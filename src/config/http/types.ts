interface Response {
  statusCode: number
}

export interface ResponseWithPayload<T> extends Response {
  data: T
}

export interface HTTPError extends Response {
  message: string
}
