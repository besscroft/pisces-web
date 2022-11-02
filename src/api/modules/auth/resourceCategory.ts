import http from '@/api'
import { ResultData } from '@/api/interface'
import { PORT_ADMIN } from '@/api/config/servicePort'
import { ResourceCategory } from '@/api/interface/auth/resourceCategory'

enum Api {
	List = '/resource/category/list',
	Delete = '/resource/category/delete',
	GetResourceCategoryDict = '/resource/category/getResourceCategoryDict',
	Add = '/resource/category/add',
	Update = '/resource/category/update'
}

/** 获取资源类别列表 */
export const List = (data: ResourceCategory.ResourceCategoryListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data)
}

/** 删除资源类别 */
export const DeleteResourceCategory = (resourceCategoryId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.Delete + '/' + resourceCategoryId)
}

/** 资源类别字典 */
export const GetResourceCategoryDict = () => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetResourceCategoryDict)
}

/** 新增资源类别 */
export const AddResourceCategory = (data: ResourceCategory.AddResourceCategoryRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.Add, data)
}

/** 更新资源类别 */
export const UpdateResourceCategory = (data: ResourceCategory.UpdateResourceCategoryRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.Update, data)
}
