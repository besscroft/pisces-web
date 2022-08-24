import request from '@/utils/request'

enum Api {
  List = '/pisces-admin/dict/list'
}

/** 获取白名单列表 */
export function List(data: DictListRequestData) {
  return request({
    url: Api.List,
    method: 'post',
    data
  })
}
