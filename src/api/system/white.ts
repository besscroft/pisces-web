import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/white/list',
  AddWhite = '/pisces-admin/white/add',
  UpdateWhite = '/pisces-admin/white/update',
  Delete = '/pisces-admin/white/delete'
}

/** 获取白名单列表 */
export function List(data: WhiteListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 新增白名单 */
export function AddWhite(data: AddWhiteRequestData) {
  return request({
    url: Api.AddWhite,
    method: 'post',
    data
  })
}

/** 更新白名单 */
export function UpdateWhite(data: UpdateWhiteRequestData) {
  return request({
    url: Api.UpdateWhite,
    method: 'put',
    data
  })
}

/** 删除白名单 */
export function DeleteWhite(whiteId: number) {
  return request({
    url: Api.Delete + '/' + whiteId,
    method: 'delete'
  })
}
