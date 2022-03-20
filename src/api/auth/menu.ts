import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/menu/list'
}

/** 获取用户列表 */
export function list(data: MenuListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}
