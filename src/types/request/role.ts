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

/** 新增角色请求参数 */
interface AddRoleRequestData {
  /** 角色名称 */
  roleName: string | undefined
  /** 角色编码 */
  roleCode: string | undefined
  /** 描述 */
  description: string | undefined
  /** 排序 */
  sort: number | undefined
}

/** 更新角色请求参数 */
interface UpdateRoleRequestData {
  /** 角色 id */
  id: number | undefined
  /** 角色名称 */
  roleName: string | undefined
  /** 角色编码 */
  roleCode: string | undefined
  /** 描述 */
  description: string | undefined
  /** 排序 */
  sort: number | undefined
}
