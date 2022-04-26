import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/depart/list',
  Delete = '/pisces-admin/depart/delete'
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
