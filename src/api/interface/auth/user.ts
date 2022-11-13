export namespace User {
	/** 用户列表请求参数 */
	export interface UserListRequestData {
		pageNum: number
		pageSize: number
		queryKey: string
	}

	/** 用户启用状态更改请求参数 */
	export interface ChangeUserStatusRequestData {
		userId: number
		status: boolean
	}

	/** 新增用户请求参数 */
	export interface AddUserRequestData {
		/** 用户名 */
		username: string | undefined
		/** 密码 */
		password: string | undefined
		/** 头像 */
		avatar: string | undefined
		/** 邮箱 */
		email: string | undefined
		/** 昵称 */
		name: string | undefined
		/** 真实姓名 */
		realName: string | undefined
		/** 手机号 */
		telephone: number | undefined
		/** 生日 */
		birthday: Date | undefined
		/** 性别 */
		sex: number | undefined
		/** 备注 */
		remark: string | undefined
	}

	/** 新增用户请求参数 */
	export interface UpdateUserRequestData {
		/** 用户id */
		id: number
		/** 头像 */
		avatar: string | undefined
		/** 邮箱 */
		email: string | undefined
		/** 昵称 */
		name: string | undefined
		/** 真实姓名 */
		realName: string | undefined
		/** 手机号 */
		telephone: number | undefined
		/** 生日 */
		birthday: Date | undefined
		/** 性别 */
		sex: number | undefined
		/** 备注 */
		remark: string | undefined
	}

	/** 更新用户角色请求参数 */
	export interface UpdateUserRoleRequestData {
		/** 用户 id */
		userId: number
		/** 角色 id 列表 */
		roleIds: Array<number> | undefined
	}

	/** 更新用户部门请求参数 */
	export interface UpdateUserDepartRequestData {
		/** 用户 id */
		userId: number
		/** 部门 id */
		departId: number
	}

	/** 密码修改请求参数 */
	export interface UpdatePasswordData {
		/** 旧密码 */
		oldPassword: string
		/** 新密码 */
		newPassword: string
	}
}
