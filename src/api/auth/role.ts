import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/role/list',
  ChangeStatus = '/pisces-admin/role/change'
}

/** 获取用户列表 */
export function list(data: RoleListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 更改角色可用状态 */
export function changeStatus(data: ChangeRoleStatusRequestData) {
  return request({
    url: Api.ChangeStatus,
    method: 'put',
    data
  })
}
