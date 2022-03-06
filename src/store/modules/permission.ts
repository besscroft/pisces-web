import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'

const Layout = () => import('@/layout/index.vue')
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('/src/views/**/**.vue')

export interface PermissionState {
  routes: any
  dynamicRoutes: any
}

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

const state: PermissionState = {
  routes: [],
  dynamicRoutes: []
}

const mutations = {
  SET_ROUTES: (state: PermissionState, routes: any) => {
    state.routes = constantRoutes.concat(routes)
    state.dynamicRoutes = routes
  }
}

const actions = {
  setRoutes({ commit }: any, { menus, username, roles }: any) {
    return new Promise(resolve => {
      const accessedRoutes: any = filterAsyncRouter(menus, true)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

/** 遍历后台传来的路由字符串，转换为组件对象 */
function filterAsyncRouter(asyncRouterMap: any, isRewrite = false) {
  const res: any = []
  asyncRouterMap.forEach((route: any) => {
    const tmp = { ...route }
    if (isRewrite && tmp.children) {
      tmp.children = filterChildren(tmp.children)
    }
    if (tmp.component) {
      // Layout 组件特殊处理
      if (tmp.component === 'Layout') {
        tmp.component = Layout
      } else {
        const component = tmp.component
        tmp.component = loadView(component)
      }
    }
    res.push(tmp)
  })
  return res
}

function filterChildren(childrenMap: any) {
  let children: any = []
  childrenMap.forEach((el: any) => {
    const component = el.component
    el.component = loadView(component)
    children = children.concat(el)
  })
  return children
}

/** 获取动态路由 */
const filterAsyncRoutes = (routes: any, menus: any) => {
  const res: any = []
  routes.forEach((route: any) => {
    const r = { ...route }
    if (hasPermission(menus, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, menus)
      }
      res.push(r)
    }
  })
  return res
}

export const loadView = (view: string) => {
  let res
  for (const path in modules) {
    const dir = path.split('views')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
