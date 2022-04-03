import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/resource/list',
  GetAll = '/pisces-admin/resource/getAll',
  GetResourceIdsByRoleId = '/pisces-admin/resource/getId/role'
}

/** 获取资源列表 */
export function list(data: ResourceListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 获取资源树 */
export function getAllResource() {
  return request({
    url: Api.GetAll,
    method: 'get'
  })
}

/** 根据角色id获取资源id列表 */
export function findResourceIdsByRoleId(id: number) {
  return request({
    url: Api.GetResourceIdsByRoleId + '/' + id,
    method: 'get'
  })
}
