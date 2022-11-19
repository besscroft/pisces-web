import { ElNotification } from 'element-plus'

/**
 * @description 全局代码错误捕捉
 * */
const errorHandler = (error: any) => {
	// 过滤 HTTP 请求错误
	if (error.status || error.status == 0) return false
	let errorMap: { [key: string]: string } = {
		InternalError: 'Javascript 引擎内部错误',
		ReferenceError: '未找到对象',
		TypeError: '使用了错误的类型或对象',
		RangeError: '使用内置对象时，参数超范围',
		SyntaxError: '语法错误',
		EvalError: '错误的使用了 Eval',
		URIError: 'URI 错误'
	}
	let errorName = errorMap[error.name] || '系统异常！'
	ElNotification({
		title: errorName,
		message: error,
		type: 'error',
		duration: 3000
	})
}

export default errorHandler
