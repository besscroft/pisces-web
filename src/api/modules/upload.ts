import { Upload } from '@/api/interface/index'
import { PORT_ADMIN } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @name 文件上传模块
 */
// * 图片上传
export const uploadImg = (params: FormData) => {
	return http.post<Upload.ResFileUrl>(PORT_ADMIN + `/file/upload/img`, params)
}

// * 视频上传
export const uploadVideo = (params: FormData) => {
	return http.post<Upload.ResFileUrl>(PORT_ADMIN + `/file/upload/video`, params)
}
