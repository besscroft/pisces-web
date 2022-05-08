/** 资源类别列表请求参数 */
interface ResourceCategoryListRequestData {
  pageNum: number
  pageSize: number
  queryKey: string
}

/** 新增资源类别请求参数 */
interface AddResourceCategoryRequestData {
  /** 资源类别名称 */
  categoryName: string | undefined
  /** 资源类别描述 */
  description: string | undefined
  /** 排序 */
  sort: number | undefined
}

/** 更新资源类别请求参数 */
interface UpdateResourceCategoryRequestData {
  /** 资源类别 id */
  resourceCategoryId: number | undefined
  /** 资源类别名称 */
  categoryName: string | undefined
  /** 资源类别描述 */
  description: string | undefined
  /** 排序 */
  sort: number | undefined
}
