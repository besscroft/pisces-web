import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/dict/list',
  AddDict = '/pisces-admin/dict/add',
  UpdateDict = '/pisces-admin/dict/update',
  Delete = '/pisces-admin/dict/delete',
  GetKeyByDictGroup = '/pisces-admin/dict/groupQuery'
}

/** 查询分组内所有字典接口 */
export function GetKeyByDictGroup(queryKey: string) {
  return request({
    url: Api.GetKeyByDictGroup,
    method: 'get',
    params: { groupName: queryKey }
  })
}

/** 获取字典列表 */
export function List(data: DictListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}

/** 新增字典 */
export function AddDict(data: AddDictRequestData) {
  return request({
    url: Api.AddDict,
    method: 'post',
    data: data
  })
}

/** 更新字典 */
export function UpdateDict(data: UpdateDictRequestData) {
  return request({
    url: Api.UpdateDict,
    method: 'put',
    data: data
  })
}

/** 删除字典 */
export function DeleteDict(dictId: number) {
  return request({
    url: Api.Delete + '/' + dictId,
    method: 'delete'
  })
}
