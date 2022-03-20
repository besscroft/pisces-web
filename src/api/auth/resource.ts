import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/resource/list'
}

/** 获取用户列表 */
export function list(data: ResourceListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}
