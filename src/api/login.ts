import request from '@/utils/request'

enum Api {
  Login = '/pisces-admin/user/login',
  GetUserInfo = '/pisces-admin/user/info',
  LoginOut = '/pisces-admin/user/loginOut'
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

/** 登录 */
export function loginOut() {
  return request({
    url: Api.LoginOut,
    method: 'post'
  })
}
