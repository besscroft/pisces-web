/** 字典列表请求参数 */
interface DictListRequestData {
  pageNum: number
  pageSize: number
  queryKey: string
}

/** 新增字典请求参数 */
interface AddDictRequestData {
  /** 字典分组名称 */
  groupName: string,
  /** 字典 key */
  key: string,
  /** 字典值 */
  value: string,
  /** 备注 */
  remark: string
}

/** 更新字典请求参数 */
interface UpdateDictRequestData {
  id: number | undefined,
  /** 字典分组名称 */
  groupName: string,
  /** 字典 key */
  key: string,
  /** 字典值 */
  value: string,
  /** 备注 */
  remark: string
}
