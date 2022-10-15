import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/user/list',
  ChangeStatus = '/pisces-admin/user/change',
  Add = '/pisces-admin/user/add',
  Delete = '/pisces-admin/user/delete',
  Update = '/pisces-admin/user/update',
  UpdateUserRole = '/pisces-admin/user/update/role',
  UpdateUserDepart = '/pisces-admin/user/update/depart'
}

/** 获取用户列表 */
export function List(data: UserListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 更改用户可用状态 */
export function ChangeStatus(data: ChangeUserStatusRequestData) {
  return request({
    url: Api.ChangeStatus,
    method: 'put',
    data
  })
}

/** 新增用户 */
export function AddUser(data: AddUserRequestData) {
  return request({
    url: Api.Add,
    method: 'post',
    data
  })
}

/** 删除用户 */
export function DeleteUser(userId: number) {
  return request({
    url: Api.Delete + '/' + userId,
    method: 'delete'
  })
}

/** 更新用户 */
export function UpdateUser(data: UpdateUserRequestData) {
  return request({
    url: Api.Update,
    method: 'put',
    data
  })
}

/** 更新用户的角色 */
export function UpdateUserRole(data: UpdateUserRoleRequestData) {
  return request({
    url: Api.UpdateUserRole,
    method: 'put',
    data
  })
}

/** 更新用户的部门 */
export function UpdateUserDepart(data: UpdateUserDepartRequestData) {
  return request({
    url: Api.UpdateUserDepart,
    method: 'put',
    data
  })
}
