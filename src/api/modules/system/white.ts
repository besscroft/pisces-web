import http from '@/api'
import { ResultData } from '@/api/interface'
import { PORT_ADMIN } from '@/api/config/servicePort'
import { White } from '@/api/interface/system/white'

enum Api {
	List = '/white/list',
	AddWhite = '/white/add',
	UpdateWhite = '/white/update',
	Delete = '/white/delete'
}

/** 获取白名单列表 */
export const List = (data: White.WhiteListRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.List, data, { headers: { noLoading: true } })
}

/** 新增白名单 */
export const AddWhite = (data: White.AddWhiteRequestData) => {
	return http.post<ResultData>(PORT_ADMIN + Api.AddWhite, data, { headers: { noLoading: true } })
}

/** 更新白名单 */
export const UpdateWhite = (data: White.UpdateWhiteRequestData) => {
	return http.put<ResultData>(PORT_ADMIN + Api.UpdateWhite, data, { headers: { noLoading: true } })
}

/** 删除白名单 */
export const DeleteWhite = (whiteId: number) => {
	return http.delete<ResultData>(PORT_ADMIN + Api.Delete + '/' + whiteId, undefined, { headers: { noLoading: true } })
}
