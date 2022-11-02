import http from '@/api'
import { ResultData } from '@/api/interface'
import { PORT_ADMIN } from '@/api/config/servicePort'
import { Menu } from '@/api/interface/auth/menu'

enum Api {
	List = '/menu/list',
	ChangeStatus = '/menu/change',
	Delete = '/menu/delete',
	Update = '/menu/update',
	GetMenuIdsByRoleId = '/menu/getId/role',
	GetAll = '/menu/getAll',
	Add = '/menu/add',
	GetMenuDict = '/menu/getMenuDict'
}

/** 获取用菜单列表 */
export const List = (data: Menu.MenuListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data)
}

/** 更改菜单可用状态 */
export const ChangeStatus = (data: Menu.ChangeMenuStatusRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.ChangeStatus, data)
}

/** 删除菜单 */
export const DeleteMenu = (menuId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.Delete + '/' + menuId)
}

/** 更新菜单 */
export const UpdateMenu = (data: Menu.UpdateMenuRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.Update, data)
}

/** 根据角色 id 查询菜单 id 列表 */
export const FindMenuIdsByRoleId = (roleId: number) => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetMenuIdsByRoleId + '/' + roleId)
}

/** 获取所有菜单树 */
export const GetAllMenu = () => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetAll)
}

/** 更新菜单 */
export const AddMenu = (data: Menu.AddMenuRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.Add, data)
}

/** 获取菜单字典 */
export const GetMenuDict = () => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetMenuDict)
}
