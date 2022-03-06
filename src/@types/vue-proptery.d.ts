import { ElMessage } from 'element-plus'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // @ts-ignore
    $message: ElMessage
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]
    activeMenu?: string
  }
}
