import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/resource/category/list',
  Delete = '/pisces-admin/resource/category/delete',
  GetResourceCategoryDict = '/pisces-admin/resource/category/getResourceCategoryDict',
  Add = '/pisces-admin/resource/category/add',
  Update = '/pisces-admin/resource/category/update'
}

/** 获取资源类别列表 */
export function List(data: ResourceCategoryListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 删除资源类别 */
export function DeleteResourceCategory(resourceCategoryId: number) {
  return request({
    url: Api.Delete + '/' + resourceCategoryId,
    method: 'delete'
  })
}

/** 资源类别字典 */
export function GetResourceCategoryDict() {
  return request({
    url: Api.GetResourceCategoryDict,
    method: 'get'
  })
}

/** 新增资源类别 */
export function AddResourceCategory(data: AddResourceCategoryRequestData) {
  return request({
    url: Api.Add,
    method: 'post',
    data
  })
}

/** 更新资源类别 */
export function UpdateResourceCategory(data: UpdateResourceCategoryRequestData) {
  return request({
    url: Api.Update,
    method: 'put',
    data
  })
}
