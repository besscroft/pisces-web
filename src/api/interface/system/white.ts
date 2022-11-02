export namespace White {
	/** 白名单列表请求参数 */
	export interface WhiteListRequestData {
		pageNum: number
		pageSize: number
		queryKey: string
	}

	/** 新增白名单请求参数 */
	export interface AddWhiteRequestData {
		/** 白名单规则名称 */
		title: string | undefined
		/** 白名单规则地址 */
		path: string | undefined
		/** 备注 */
		remark: string | undefined
	}

	/** 更新白名单请求参数 */
	export interface UpdateWhiteRequestData {
		/** 白名单 id */
		whiteId: number | undefined
		/** 白名单规则名称 */
		title: string | undefined
		/** 白名单规则地址 */
		path: string | undefined
		/** 备注 */
		remark: string | undefined
	}
}
