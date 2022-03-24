import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/menu/list',
  ChangeStatus = '/pisces-admin/menu/change',
  Delete = '/pisces-admin/menu/delete',
  Update = '/pisces-admin/menu/update'
}

/** 获取用菜单列表 */
export function list(data: MenuListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 更改菜单可用状态 */
export function changeStatus(data: ChangeMenuStatusRequestData) {
  return request({
    url: Api.ChangeStatus,
    method: 'put',
    data
  })
}

/** 删除菜单 */
export function deleteMenu(id: number) {
  return request({
    url: Api.Delete + '/' + id,
    method: 'delete'
  })
}

/** 更新菜单 */
export function updateMenu(data: UpdateMenuRequestData) {
  return request({
    url: Api.Update,
    method: 'put',
    data
  })
}
