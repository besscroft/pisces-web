import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'normalize.css'
import '@/router/permission'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

// 使用element-plus,设置本地化
// app.use(ElementPlus, {
//   locale: zhCn
// })

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
