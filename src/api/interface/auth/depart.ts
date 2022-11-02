export namespace Depart {
	/** 部门列表请求参数 */
	export interface DepartListRequestData {
		pageNum: number
		pageSize: number
		queryKey: string
	}

	/** 新增部门请求参数 */
	export interface AddDepartRequestData {
		/** 上级 id */
		parentId: number | undefined
		/** 部门名称 */
		name: string | undefined
		/** 部门描述 */
		description: string | undefined
		/** 排序 */
		sort: number | undefined
	}

	/** 更新部门请求参数 */
	export interface UpdateDepartRequestData {
		/** 部门 id */
		departId: number | undefined
		/** 上级 id */
		parentId: number | undefined
		/** 部门名称 */
		name: string | undefined
		/** 部门描述 */
		description: string | undefined
		/** 排序 */
		sort: number | undefined
	}
}
