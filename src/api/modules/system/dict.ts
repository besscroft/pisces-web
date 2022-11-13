import http from '@/api'
import { ResultData } from '@/api/interface'
import { PORT_ADMIN } from '@/api/config/servicePort'
import { Dict } from '@/api/interface/system/dict'

enum Api {
	List = '/dict/list',
	AddDict = '/dict/add',
	UpdateDict = '/dict/update',
	Delete = '/dict/delete',
	GetKeyByDictGroup = '/dict/groupQuery'
}

/** 查询分组内所有字典接口 */
export const GetKeyByDictGroup = (queryKey: string) => {
	return http.get<ResultData>(PORT_ADMIN + Api.GetKeyByDictGroup, { groupName: queryKey }, { headers: { noLoading: true } })
}

/** 获取字典列表 */
export const List = (data: Dict.DictListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data, { headers: { noLoading: true } })
}

/** 新增字典 */
export const AddDict = (data: Dict.AddDictRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.AddDict, data, { headers: { noLoading: true } })
}

/** 更新字典 */
export const UpdateDict = (data: Dict.UpdateDictRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateDict, data, { headers: { noLoading: true } })
}

/** 删除字典 */
export const DeleteDict = (dictId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.Delete + '/' + dictId, undefined, { headers: { noLoading: true } })
}
