import http from '@/api'
import { User } from '@/api/interface/auth/user'
import { ResultData } from '@/api/interface'
import { PORT_ADMIN } from '@/api/config/servicePort'

enum Api {
	List = '/user/list',
	ChangeStatus = '/user/change',
	Add = '/user/add',
	Delete = '/user/delete',
	Update = '/user/update',
	UpdateUserRole = '/user/update/role',
	UpdateUserDepart = '/user/update/depart',
	GetUserInfoByUserName = '/user/info'
}

/** 获取用户列表 */
export const List = (data: User.UserListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data, { headers: { noLoading: true } })
}

/** 更改用户可用状态 */
export const ChangeStatus = (data: User.ChangeUserStatusRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.ChangeStatus, data, { headers: { noLoading: true } })
}

/** 新增用户 */
export const AddUser = (data: User.AddUserRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.Add, data, { headers: { noLoading: true } })
}

/** 删除用户 */
export const DeleteUser = (userId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.Delete + '/' + userId, undefined,{ headers: { noLoading: true } })
}

/** 更新用户 */
export const UpdateUser = (data: User.UpdateUserRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.Update, data, { headers: { noLoading: true } })
}

/** 更新用户的角色 */
export const UpdateUserRole = (data: User.UpdateUserRoleRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateUserRole, data, { headers: { noLoading: true } })
}

/** 更新用户的部门 */
export const UpdateUserDepart = (data: User.UpdateUserDepartRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateUserDepart, data, { headers: { noLoading: true } })
}

/** 根据用户名获取用户信息 */
export const GetUserInfoByUserName = (username: string) => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetUserInfoByUserName + '/'+ username, undefined,{ headers: { noLoading: true } })
}
