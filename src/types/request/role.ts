/** 角色列表请求参数 */
interface RoleListRequestData {
  pageNum: number
  pageSize: number
  queryKey: string
}

/** 角色启用状态更改请求参数 */
interface ChangeRoleStatusRequestData {
  roleId: number
  status: boolean
}
