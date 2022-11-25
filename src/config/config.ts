// ? 全局不动配置项 只做导出不做修改

// * 首页地址（默认）
export const HOME_URL: string = '/home/index'

// * 登录页地址（默认）
export const LOGIN_URL: string = '/login'

// * 默认主题颜色
export const DEFAULT_PRIMARY: string = '#009688'

// * Tabs（白名单地址，不需要添加到 tabs 的路由地址）
export const TABS_WHITE_LIST: string[] = ['/403', '/404', '/500', LOGIN_URL]

// * 高德地图key
export const MAP_KEY: string = ''

// * Cookie 名称 -> Token
export const COOKIE_NAME_TOKEN = 'pisces-cookie-token'

// * Cookie 名称 -> TokenHead
export const COOKIE_NAME_TOKEN_HEAD = 'pisces-cookie-tokenHead'

// * Cookie 名称 -> RefreshToken
export const COOKIE_NAME_REFRESH_TOKEN = 'pisces-cookie-refreshToken'
