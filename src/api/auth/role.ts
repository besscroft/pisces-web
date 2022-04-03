import request from '@/utils/request'
import { TreeKey } from 'element-plus/es/components/tree-v2/src/types'

enum Api {
  List = '/pisces-admin/role/list',
  ChangeStatus = '/pisces-admin/role/change',
  UpdateMenu = '/pisces-admin/role/update/menu',
  UpdateResource = '/pisces-admin/role/update/resource',
  Delete = '/pisces-admin/role/delete',
  AddRole = '/pisces-admin/role/add',
  UpdateRole = '/pisces-admin/role/update'
}

/** 获取菜单列表 */
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

/** 更新角色菜单 */
export function updateMenu(roleId: number, menuIds: Array<TreeKey>) {
  return request({
    url: Api.UpdateMenu,
    method: 'post',
    data: {
      roleId: roleId,
      menuIds: menuIds
    }
  })
}

/** 更新角色资源 */
export function updateResource(roleId: number, resourceIds: Array<TreeKey>) {
  return request({
    url: Api.UpdateResource,
    method: 'post',
    data: {
      roleId: roleId,
      resourceIds: resourceIds
    }
  })
}

/** 删除角色 */
export function deleteRoleById(roleId: number) {
  return request({
    url: Api.Delete + '/' + roleId,
    method: 'delete'
  })
}

/** 新增角色 */
export function AddRole(data: AddRoleRequestData) {
  return request({
    url: Api.AddRole,
    method: 'post',
    data
  })
}

/** 更新角色 */
export function UpdateRole(data: UpdateRoleRequestData) {
  return request({
    url: Api.UpdateRole,
    method: 'put',
    data
  })
}
