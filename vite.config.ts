import { ConfigEnv, loadEnv, UserConfigExport} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  const env = loadEnv(mode, root) as unknown as ImportMetaEnv
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    base: './',
    server: {
      // hostname: '0.0.0.0',
      host: "localhost",
      port: 3000,
      // 是否自动在浏览器打开
      open: true,
      // 是否开启 https
      https: false,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      // 导入文件夹别名
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    }
  }
}
