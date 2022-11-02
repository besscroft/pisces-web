import http from '@/api'
import { ResultData } from '@/api/interface'
import { PORT_ADMIN } from '@/api/config/servicePort'
import { Depart } from '@/api/interface/auth/depart'

enum Api {
	List = '/depart/list',
	Delete = '/depart/delete',
	AddDepart = '/depart/add',
	UpdateDepart = '/depart/update',
	GetDepartDict = '/depart/getDepartDict',
	GetUserDepartList = '/depart/getUserDepartList'
}

/** 获取部门列表 */
export const List = (data: Depart.DepartListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data)
}

/** 删除部门 */
export const DeleteDepart = (departId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.List + '/' + departId)
}

/** 新增部门 */
export const AddDepart = (data: Depart.AddDepartRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.AddDepart, data)
}

/** 更新部门 */
export const UpdateDepart = (data: Depart.UpdateDepartRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateDepart, data)
}

/** 部门字典 */
export const GetDepartDict = () => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetDepartDict)
}

/** 部门树 */
export const GetUserDepartList = () => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetUserDepartList)
}
