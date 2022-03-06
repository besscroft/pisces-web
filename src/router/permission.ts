import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { whiteList } from '@/config/white-list'
import { getToken } from '@/utils/cookies'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()
  // 判断该用户是否登录
  if (getToken()) {
    if (to.path === '/login') {
      // 如果登录，并准备进入 login 页面，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取用户的角色
      const roles = store.state.user.roles
      if (store.state.user.roles.length > 0) {
        // 角色存在
        next()
      } else {
        // 角色不存在
        try {
          // 请求后端，获取用户角色
          await store.dispatch('user/getInfo').then(res => {
            // 获取接口返回的 roles
            const { menus, username, roles } = res
            // 根据角色生成可访问的 routes
            store.dispatch('permission/setRoutes', { menus, username, roles })
            // 动态地添加可访问的 routes
            store.state.permission.dynamicRoutes.forEach((route: any) => {
              router.addRoute(route)
            })
            // 确保添加路由已完成
            // 设置 replace: true, 因此导航将不会留下历史记录
            next({ ...to, replace: true })
          })
        } catch (err: any) {
          // 删除 token，并重定向到登录页面
          store.dispatch('user/resetToken')
          ElMessage.error(err.message || 'Has Error')
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    // 如果没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
