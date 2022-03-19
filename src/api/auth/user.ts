import request from '@/utils/request'

interface UserListRequestData {
  pageNum: number
  pageSize: number
  queryKey: string
}

enum Api {
  LIST = '/pisces-admin/user/list'
}

/** 获取用户列表 */
export function list(data: UserListRequestData) {
  return request({
    url: Api.LIST,
    method: 'post',
    data
  })
}
