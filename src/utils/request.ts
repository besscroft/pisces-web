import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/cookies'

/** 创建请求实例 */
const request = axios.create({
  timeout: 5000,
  baseURL: '/api'
})

/** 异常拦截处理器 */
const errorHandler = (error:{message:string}) => {
  ElMessage.error(error.message || 'Error')
  return Promise.reject(error)
}

/** 请求拦截器 */
request.interceptors.request.use(config => {
  const token = getToken()
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (config.headers !== undefined && token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, errorHandler)

/** 响应拦截器 */
request.interceptors.response.use((response:AxiosResponse<BaseResponse>) => {
  const data = response.data as any
  // 后端 http 状态码
  const code = data.code
  if (code === undefined) {
    ElMessage.error('接口异常！')
    return Promise.reject(new Error('接口异常！'))
  } else {
    switch (code) {
      case 200:
        return data
      default:
        ElMessage.error(data.msg || 'Error')
        return Promise.reject(new Error('Error'))
    }
  }
}, errorHandler)

export default request
