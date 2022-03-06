import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'normalize.css'
import '@/router/permission'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
