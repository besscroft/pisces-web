import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/depart/list',
  Delete = '/pisces-admin/depart/delete',
  AddDepart = '/pisces-admin/depart/add',
  UpdateDepart = '/pisces-admin/depart/update',
  GetDepartDict = '/pisces-admin/depart/getDepartDict'
}

/** 获取部门列表 */
export function List(data: DepartListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 删除部门 */
export function DeleteDepart(departId: number) {
  return request({
    url: Api.Delete + '/' + departId,
    method: 'delete'
  })
}

/** 新增部门 */
export function AddDepart(data: AddDepartRequestData) {
  return request({
    url: Api.AddDepart,
    method: 'post',
    data: data
  })
}

/** 更新部门 */
export function UpdateDepart(data: UpdateDepartRequestData) {
  return request({
    url: Api.UpdateDepart,
    method: 'put',
    data: data
  })
}

/** 部门字典 */
export function GetDepartDict() {
  return request({
    url: Api.GetDepartDict,
    method: 'get'
  })
}
