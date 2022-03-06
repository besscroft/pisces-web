<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div class="login-title">
        Pisces Cloud
      </div>
      <div class="content">
        <el-form
          ref="loginFormDom"
          :model="loginForm"
          :rules="loginRules"
          @keyup.enter="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
            />
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">
            登 录
          </el-button>
        </el-form>
        用户名:admin 密码:666666
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import store from '@/store'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import ThemeSwitch from '@/components/themeSwitch/index.vue'

interface ILoginForm {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
}

const router = useRouter()

const loading = ref<boolean>(false)
const loginFormDom = ref<any>()
const loginForm = reactive<ILoginForm>({
  username: 'admin',
  password: '666666'
})
const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
  ]
})
const handleLogin = () => {
  loginFormDom.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      store.dispatch('user/login', {
        username: loginForm.username.trim(),
        password: loginForm.password
      }).then(() => {
        loading.value = false
        router.push({ path: '/' }).catch((err) => {
          console.warn(err)
        })
      }).catch(() => {
        loading.value = false
      })
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-title {
    text-align: center;
    font-size: 36px;
  }
  .login-card {
    width: 480px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      .show-code {
        position: absolute;
        right: 0px;
        top: 0px;
        cursor: pointer;
        user-select: none;
        img {
          width: 100px;
          height: 40px;
          border-radius: 4px;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
