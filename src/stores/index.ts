import { defineStore, createPinia } from 'pinia'
import { GlobalState, ThemeConfigProps } from './interface'
import { DEFAULT_PRIMARY } from '@/config/config'
import piniaPersistConfig from '@/config/piniaPersist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: 'GlobalState',
	// state: 返回对象的函数
	state: (): GlobalState => ({
		// token
		token: '',
		// tokenHead
		tokenHead: '',
		// refreshToken
		refreshToken: '',
		// 用户名
		username: '',
		// 昵称
		realName: '',
		// 头像
		avatar: '',
		// element组件大小
		assemblySize: 'default',
		// language
		language: '',
		// themeConfig
		themeConfig: {
			// 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
			layout: 'vertical',
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false,
			// 折叠菜单
			isCollapse: false,
			// 面包屑导航
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: true,
			// 标签页图标
			tabsIcon: true,
			// 页脚
			footer: true,
			// 当前页面是否全屏
			maximize: false
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token
		},
		// setToken
		setTokenHead(tokenHead: string) {
			this.tokenHead = tokenHead
		},
		// setToken
		setRefreshToken(refreshToken: string) {
			this.refreshToken = refreshToken
		},
		// setUsername
		setUsername(username: string) {
			this.username = username
		},
		// realName
		setRealName(realName: string) {
			this.realName = realName
		},
		// setAvatar
		setAvatar(avatar: any) {
			this.avatar = avatar
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: string) {
			this.assemblySize = assemblySize
		},
		// updateLanguage
		updateLanguage(language: string) {
			this.language = language
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig
		}
	},
	persist: piniaPersistConfig('GlobalState')
})

// piniaPersist(持久化)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
