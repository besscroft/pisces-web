import request from '@/utils/request'

interface IUserRequestData {
  username: string
  password: string
}

enum Api {
  Login = '/pisces-admin/user/login',
  GetUserInfo = '/pisces-admin/user/info'
}

/** 登录 */
export function login(data: IUserRequestData) {
  return request({
    url: Api.Login,
    method: 'post',
    data
  })
}
/** 获取用户详情 */
export function GetUserInfo() {
  return request({
    url: Api.GetUserInfo,
    method: 'get'
  })
}
