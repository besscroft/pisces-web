import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/resource/category/list',
  Delete = '/pisces-admin/resource/category/delete',
  GetResourceCategoryDict = '/pisces-admin/resource/category/getResourceCategoryDict'
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
