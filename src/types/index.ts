interface BaseResponse<T = any> {
  code: number
  message: string
  data: T
}

interface IUserRequestData {
  username: string
  password: string
}
