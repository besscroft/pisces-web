import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/resource/list',
  GetAll = '/pisces-admin/resource/getAll',
  GetResourceIdsByRoleId = '/pisces-admin/resource/getId/role',
  Delete = '/pisces-admin/resource/delete'
}

/** 获取资源列表 */
export function List(data: ResourceListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 获取资源树 */
export function GetAllResource() {
  return request({
    url: Api.GetAll,
    method: 'get'
  })
}

/** 根据角色id获取资源id列表 */
export function FindResourceIdsByRoleId(id: number) {
  return request({
    url: Api.GetResourceIdsByRoleId + '/' + id,
    method: 'get'
  })
}

/** 删除资源类别 */
export function DeleteResource(resourceId: number) {
  return request({
    url: Api.Delete + '/' + resourceId,
    method: 'delete'
  })
}
