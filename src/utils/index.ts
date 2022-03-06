import dayjs from 'dayjs'

/** 格式化时间 */
export const formatDateTime = (time: any) => {
  if (time == null || time === '') {
    return 'N/A'
  }
  const date = new Date(time)
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

// 返回项目路径
export function getResolvePath(path: string) {
  if (path.length === 0 || !path || path == 'undefined') {
    return path
  }
  let res = path.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}
