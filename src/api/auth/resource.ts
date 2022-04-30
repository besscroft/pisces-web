import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/resource/list',
  GetAll = '/pisces-admin/resource/getAll',
  GetResourceIdsByRoleId = '/pisces-admin/resource/getId/role',
  Delete = '/pisces-admin/resource/delete',
  AddResource = '/pisces-admin/resource/add',
  UpdateResource = '/pisces-admin/resource/update'
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

/** 新增资源 */
export function AddResource(data: AddResourceRequestData) {
  return request({
    url: Api.AddResource,
    method: 'post',
    data: data
  })
}

/** 更新资源 */
export function UpdateResource(data: UpdateResourceRequestData) {
  return request({
    url: Api.UpdateResource,
    method: 'put',
    data: data
  })
}
