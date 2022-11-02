import { ResPage, User } from '@/api/interface/index'
import { PORT_ADMIN } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = (params: User.ReqGetUserParams) => {
	return http.post<ResPage<User.ResUserList>>(PORT_ADMIN + `/user/list`, params)
}

// * 新增用户
export const addUser = (params: { id: string }) => {
	return http.post(PORT_ADMIN + `/user/add`, params)
}

// * 批量添加用户
export const BatchAddUser = (params: FormData) => {
	return http.post(PORT_ADMIN + `/user/import`, params)
}

// * 编辑用户
export const editUser = (params: { id: string }) => {
	return http.post(PORT_ADMIN + `/user/edit`, params)
}

// * 删除用户
export const deleteUser = (params: { id: string[] }) => {
	return http.post(PORT_ADMIN + `/user/delete`, params)
}

// * 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
	return http.post(PORT_ADMIN + `/user/change`, params)
}

// * 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
	return http.post(PORT_ADMIN + `/user/rest_password`, params)
}

// * 导出用户数据
export const exportUserInfo = (params: User.ReqGetUserParams) => {
	return http.post<BlobPart>(PORT_ADMIN + `/user/export`, params, { responseType: 'blob' })
}

// * 获取用户状态
export const getUserStatus = () => {
	return http.get<User.ResStatus>(PORT_ADMIN + `/user/status`)
}

// * 获取用户性别字典
export const getUserGender = () => {
	return http.get<User.ResGender>(PORT_ADMIN + `/user/gender`)
}

// * 获取用户部门列表
export const getUserDepartment = () => {
	return http.get<User.ResDepartment>(PORT_ADMIN + `/user/department`)
}
