export namespace Menu {
	/** 菜单列表请求参数 */
	export interface MenuListRequestData {
		pageNum: number
		pageSize: number
		queryKey: string
	}

	/** 菜单启用状态更改请求参数 */
	export interface ChangeMenuStatusRequestData {
		menuId: number
		isHide: boolean
	}

	/** 菜单更新请求参数 */
	export interface UpdateMenuRequestData {
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
		/** 重定向地址 */
		redirect: string | undefined
		/** 路由地址 */
		path: string | undefined
		/** 菜单图标名称 */
		icon: string | undefined
		/** 外链（如果有填地址） */
		isLink: string | undefined
		/** 菜单显示状态：0->禁用；1->启用 */
		isHide: number | boolean | undefined
		/** 是否全屏：0->否；1->是 */
		isFull: number | boolean | undefined
		/** 是否固定在 tabs nav：0->否；1->是 */
		isAffix: number | boolean | undefined
		/** 是否缓存：0->否；1->是 */
		isKeepAlive: number | boolean | undefined
		/** 菜单排序 */
		sort: number
	}

	/** 菜单新增请求参数 */
	export interface AddMenuRequestData {
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
		/** 重定向地址 */
		redirect: string | undefined
		/** 路由地址 */
		path: string | undefined
		/** 菜单图标名称 */
		icon: string | undefined
		/** 外链（如果有填地址） */
		isLink: string | boolean | undefined
		/** 菜单显示状态：0->禁用；1->启用 */
		isHide: number | boolean | undefined
		/** 是否全屏：0->否；1->是 */
		isFull: number | boolean | undefined
		/** 是否固定在 tabs nav：0->否；1->是 */
		isAffix: number | boolean | undefined
		/** 是否缓存：0->否；1->是 */
		isKeepAlive: number | boolean | undefined
		/** 菜单排序 */
		sort: number | undefined
	}
}
