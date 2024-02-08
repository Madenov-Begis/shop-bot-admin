interface Response {
  status: number
}

type ValidationsError = Record<string, string[] | string>

export interface ResponseWithData<T> extends Response {
  data: T
}

export interface ResponseWithMessage extends Response {
  message: string
}

export interface ResponseWithPagination<T> extends ResponseWithData<T> {
  meta: {
    total: number
  }
}

export interface HTTPError extends Response {
  message: string
  errors?: ValidationsError
}
