import { Login, ResultData } from '@/api/interface/index'
import { PORT_ADMIN } from '@/api/config/servicePort'
import http from '@/api'

/**
 * @name 登录模块
 */
enum Api {
	Login = '/user/login',
	GetUserInfo = '/user/info',
	LoginOut = '/user/loginOut'
}

/** 用户登录接口 */
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT_ADMIN + Api.Login, params, { headers: { noLoading: true } })
}

/** 获取用户信息 */
export const getInfo = () => {
	return http.get<any>(PORT_ADMIN + Api.GetUserInfo)
}

/** 退出登录 */
export const loginOut = () => {
	return http.post<ResultData>(PORT_ADMIN + Api.LoginOut)
}
