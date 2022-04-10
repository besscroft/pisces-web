import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/resource/category/list'
}

/** 获取资源类别列表 */
export function List(data: ResourceCategoryListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}
