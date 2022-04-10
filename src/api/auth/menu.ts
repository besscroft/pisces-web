import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/menu/list',
  ChangeStatus = '/pisces-admin/menu/change',
  Delete = '/pisces-admin/menu/delete',
  Update = '/pisces-admin/menu/update',
  GetMenuIdsByRoleId = '/pisces-admin/menu/getId/role',
  GetAll = '/pisces-admin/menu/getAll'
}

/** 获取用菜单列表 */
export function List(data: MenuListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 更改菜单可用状态 */
export function ChangeStatus(data: ChangeMenuStatusRequestData) {
  return request({
    url: Api.ChangeStatus,
    method: 'put',
    data
  })
}

/** 删除菜单 */
export function DeleteMenu(menuId: number) {
  return request({
    url: Api.Delete + '/' + menuId,
    method: 'delete'
  })
}

/** 更新菜单 */
export function UpdateMenu(data: UpdateMenuRequestData) {
  return request({
    url: Api.Update,
    method: 'put',
    data
  })
}

/** 根据角色 id 查询菜单 id 列表 */
export function FindMenuIdsByRoleId(roleId: number) {
  return request({
    url: Api.GetMenuIdsByRoleId + '/' + roleId,
    method: 'get'
  })
}

/** 获取所有菜单树 */
export function GetAllMenu() {
  return request({
    url: Api.GetAll,
    method: 'get'
  })
}
