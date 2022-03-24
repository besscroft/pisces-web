import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/depart/list'
}

/** 获取部门列表 */
export function list(data: DepartListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}
