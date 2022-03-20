import { getToken, removeToken, setToken } from '@/utils/cookies'
import { resetRouter } from '@/router'
import { login, GetUserInfo } from '@/api/login'

export type UserState = {
  token: string
  name: string
  avatar: string
  roles: string[]
}

const state: UserState = {
  token: getToken() || '',
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state: UserState, token: string) => {
    state.token = token
  },
  SET_NAME: (state: UserState, name: string) => {
    state.name = name
  },
  SET_AVATAR: (state: UserState, avatar: string) => {
    state.avatar = avatar
  },
  SET_ROLES: (state: UserState, roles: string[]) => {
    state.roles = roles
  }
}

const actions = {
  /** 登录 */
  login({ commit }: any, userInfo: { username: string, password: string }) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username, password })
        .then((res: any) => {
          let resData = res.data
          const { data } = JSON.parse(JSON.stringify(resData))
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /** 获取用户详情 */
  getInfo({ commit }: any) {
    return new Promise((resolve, reject) => {
      GetUserInfo()
        .then((res: any) => {
          let resData = res.data
          const { data } = JSON.parse(JSON.stringify(resData))
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.avatar)
          commit('SET_ROLES', data.roles)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /** 登出 */
  logout({ commit }: any) {
    removeToken()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    resetRouter()
  },
  /** 重置 token */
  resetToken({ commit }: any) {
    removeToken()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
