import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/user/list',
  ChangeStatus = '/pisces-admin/user/change',
  Add = '/pisces-admin/user/add',
  Delete = '/pisces-admin/user/delete',
  Update = '/pisces-admin/user/update'
}

/** 获取用户列表 */
export function list(data: UserListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 更改用户可用状态 */
export function changeStatus(data: ChangeUserStatusRequestData) {
  return request({
    url: Api.ChangeStatus,
    method: 'put',
    data
  })
}

/** 新增用户 */
export function addUser(data: AddUserRequestData) {
  return request({
    url: Api.Add,
    method: 'post',
    data
  })
}

/** 删除用户 */
export function deleteUser(id: number) {
  return request({
    url: Api.Delete + '/' + id,
    method: 'delete'
  })
}

/** 更新用户 */
export function updateUser(data: UpdateUserRequestData) {
  return request({
    url: Api.Update,
    method: 'put',
    data
  })
}
