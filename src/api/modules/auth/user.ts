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
	UpdateUserDepart = '/user/update/depart'
}

/** 获取用户列表 */
export const List = (data: User.UserListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data)
}

/** 更改用户可用状态 */
export const ChangeStatus = (data: User.ChangeUserStatusRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.ChangeStatus, data)
}

/** 新增用户 */
export const AddUser = (data: User.AddUserRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.Add, data)
}

/** 删除用户 */
export const DeleteUser = (userId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.Delete + '/' + userId)
}

/** 更新用户 */
export const UpdateUser = (data: User.UpdateUserRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.Update, data)
}

/** 更新用户的角色 */
export const UpdateUserRole = (data: User.UpdateUserRoleRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateUserRole, data)
}

/** 更新用户的部门 */
export const UpdateUserDepart = (data: User.UpdateUserDepartRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateUserDepart, data)
}
