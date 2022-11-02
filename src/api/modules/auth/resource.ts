import http from '@/api'
import { ResultData } from '@/api/interface'
import { PORT_ADMIN } from '@/api/config/servicePort'
import { Resource } from '@/api/interface/auth/resource'

enum Api {
	List = '/resource/list',
	GetAll = '/resource/getAll',
	GetResourceIdsByRoleId = '/resource/getId/role',
	Delete = '/resource/delete',
	AddResource = '/resource/add',
	UpdateResource = '/resource/update'
}

/** 获取资源列表 */
export const List = (data: Resource.ResourceListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data)
}

/** 获取资源树 */
export const GetAllResource = () => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetAll)
}

/** 根据角色id获取资源id列表 */
export const FindResourceIdsByRoleId = (id: number) => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetResourceIdsByRoleId + '/' + id)
}

/** 删除资源类别 */
export const DeleteResource = (resourceId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.Delete + '/' + resourceId)
}

/** 新增资源 */
export const AddResource = (data: Resource.AddResourceRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.AddResource, data)
}

/** 更新资源 */
export const UpdateResource = (data: Resource.UpdateResourceRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateResource, data)
}
