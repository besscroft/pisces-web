import { defineStore } from 'pinia'
import { AuthState } from '@/stores/interface'
import { getInfo } from '@/api/modules/login'
import { getKeepAliveRouterName, getShowMenuList, getAllBreadcrumbList } from '@/utils/util'
import { GlobalStore } from '@/stores'

// AuthStore
export const AuthStore = defineStore({
	id: 'AuthState',
	state: (): AuthState => ({
		authButtonList: {},
		// menuList 作为动态路由，不会做持久化存储
		authMenuList: []
	}),
	getters: {
		// 按钮权限列表
		authButtonListGet: state => state.authButtonList,
		// 后端返回的菜单列表
		authMenuListGet: state => state.authMenuList,
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.authMenuList),
		// 面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList),
		// 需要缓存的菜单 name，用作页面 keepAlive
		keepAliveRouterGet: state => getKeepAliveRouterName(state.authMenuList)
	},
	actions: {
		// getInfo
		async getInfo() {
			const { data } = await getInfo()
			const globalStore = GlobalStore()
			globalStore.setAvatar(data.avatar)
			globalStore.setUsername(data.username)
			this.authMenuList = data.menus
		}
	}
})
