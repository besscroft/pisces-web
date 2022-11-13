import { TreeKey } from 'element-plus/es/components/tree-v2/src/types'
import http from '@/api'
import { ResultData } from '@/api/interface'
import { PORT_ADMIN } from '@/api/config/servicePort'
import { Role } from '@/api/interface/auth/role'

enum Api {
	List = '/role/list',
	ChangeStatus = '/role/change',
	UpdateMenu = '/role/update/menu',
	UpdateResource = '/role/update/resource',
	Delete = '/role/delete',
	AddRole = '/role/add',
	UpdateRole = '/role/update',
	GetRoleDict = '/role/getRoleDict',
	GetRoleByUserId = '/role/get'
}

/** 获取菜单列表 */
export const List = (data: Role.RoleListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data, { headers: { noLoading: true } })
}

/** 更改角色可用状态 */
export const ChangeStatus = (data: Role.ChangeRoleStatusRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.ChangeStatus, data, { headers: { noLoading: true } })
}

/** 更新角色菜单 */
export const UpdateMenu = (roleId: number, menuIds: Array<TreeKey>) => {
	return http.post<ResultData>(PORT_ADMIN + Api.UpdateMenu, {
		roleId: roleId,
		menuIds: menuIds
	}, { headers: { noLoading: true } })
}

/** 更新角色资源 */
export const UpdateResource = (roleId: number, resourceIds: Array<TreeKey>) => {
	return http.post<ResultData>(PORT_ADMIN + Api.UpdateResource, {
		roleId: roleId,
		resourceIds: resourceIds
	}, { headers: { noLoading: true } })
}

/** 删除角色 */
export const DeleteRoleById = (roleId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.Delete + '/' + roleId, undefined, { headers: { noLoading: true } })
}

/** 新增角色 */
export const AddRole = (data: Role.AddRoleRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.AddRole, data, { headers: { noLoading: true } })
}

/** 更新角色 */
export const UpdateRole = (data: Role.UpdateRoleRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateRole, data, { headers: { noLoading: true } })
}

/** 获取角色字典 */
export const GetRoleDict = () => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetRoleDict, undefined, { headers: { noLoading: true } })
}

/** 根据用户 id 获取角色信息 */
export const GetRoleByUserId = (userId: number) => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetRoleByUserId + '/' + userId, undefined, { headers: { noLoading: true } })
}
