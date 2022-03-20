<!-- 导航栏 -->
<template>
  <div class="navbar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="state.toggleSideBar" />
    <BreadCrumb class="breadcrumb" />
    <div class="right-menu">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <el-avatar :src="squareUrl" :size="34" />
        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="https://github.com/besscroft">
              <el-dropdown-item>GitHub</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="state.logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import BreadCrumb from '../breadCrumb/index.vue'
import Hamburger from '../hamburger/index.vue'
import ThemeSwitch from '@/components/themeSwitch/index.vue'
import Screenfull from '@/components/screenfull/index.vue'
import { loginOut } from '@/api/login'
import {ElMessage} from "element-plus";

const router = useRouter()
const squareUrl = computed(() => {
  return store.state.user.avatar
})
const sidebar = computed(() => {
  return store.state.app.sidebar
})
const showThemeSwitch = computed(() => {
  return store.state.settings.showThemeSwitch
})
const showScreenfull = computed(() => {
  return store.state.settings.showScreenfull
})
const state = reactive({
  toggleSideBar: () => {
    store.commit('app/TOGGLE_SIDEBAR', false)
  },
  logout: () => {
    loginOut().then(res => {
      let resData = res.data
      if (resData.code === 200) {
        ElMessage({
          showClose: true,
          type: 'success',
          message: resData.message
        })
        store.dispatch('user/logout')
        router.push('/login').catch((err) => {
          console.warn(err)
        })
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background: #fff;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #5a5e66;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
