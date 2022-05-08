/** 菜单列表请求参数 */
interface MenuListRequestData {
  pageNum: number
  pageSize: number
  queryKey: string
}

/** 菜单启用状态更改请求参数 */
interface ChangeMenuStatusRequestData {
  menuId: number
  hidden: boolean
}

/** 菜单更新请求参数 */
interface UpdateMenuRequestData {
  /** 菜单id */
  id: number
  /** 父级菜单 id */
  parentId: number | undefined
  /** 菜单名称 */
  title: string | undefined
  /** 前端名称 */
  name: string | undefined
  /** 菜单级数 */
  level: number
  /** 组件路径 */
  component: string | undefined
  /** 路由地址 */
  path: string | undefined
  /** 菜单图标名称 */
  icon: string | undefined
  /** 菜单排序 */
  sort: number
}

/** 菜单新增请求参数 */
interface AddMenuRequestData {
  /** 父级菜单 id */
  parentId: number | undefined
  /** 菜单名称 */
  title: string | undefined
  /** 前端名称 */
  name: string | undefined
  /** 菜单级数 */
  level: number | undefined
  /** 组件路径 */
  component: string | undefined
  /** 路由地址 */
  path: string | undefined
  /** 菜单图标名称 */
  icon: string | undefined
  /** 菜单排序 */
  sort: number | undefined
}
