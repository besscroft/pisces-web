<template>
	<div class="common-layout">
		<el-container style="height: 100%">
			<el-header style="margin-top: 12px">
				<el-card class="box-card">
					用户管理
					<el-input style="width: 20%" v-model="data.queryParam.queryKey" placeholder="请输入搜索项" :prefix-icon="Search" clearable />
					<el-button style="margin-left: 4px" type="primary" @click="handleSearchChange" :icon="Search">
						搜索
					</el-button>
					<el-button style="margin-left: 4px" type="primary" @click="handleAddUser" :icon="Avatar">
						新增用户
					</el-button>
				</el-card>
			</el-header>
			<el-main>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-card class="box-card">
							<template #header>
								<div class="card-header">
									<span>部门</span>
								</div>
							</template>
							<el-tree
								:data="departData"
								:props="departProps"
								accordion
								:default-expand-all="true"
								:highlight-current="true"
								@node-click="handleDepartNodeClick"
							/>
						</el-card>
					</el-col>
					<el-col :span="18">
						<el-card class="box-card">
							<el-table v-loading="loading" border :data="userList" style="width: 100%">
								<el-table-column prop="username" label="用户名"/>
								<el-table-column prop="avatar" label="头像" width="88">
									<template #default="scope">
										<el-image style="width: 66px; height: 66px" :src="scope.row.avatar" fit="fill" />
									</template>
								</el-table-column>
								<el-table-column prop="email" label="邮箱" />
								<el-table-column prop="name" label="昵称"/>
								<el-table-column prop="telephone" label="手机" />
								<el-table-column prop="sex" label="性别">
									<template #default="scope">
										<p v-if="scope.row.sex === 1">男</p>
										<p v-else>女</p>
									</template>
								</el-table-column>
								<el-table-column prop="status" label="启用状态">
									<template #default="scope">
										<el-switch
											v-model="scope.row.status"
											inline-prompt
											active-text="是"
											inactive-text="否"
											@change="handleChangeStatus(scope.row)"
										/>
									</template>
								</el-table-column>
								<el-table-column prop="remark" label="备注" />
								<el-table-column fixed="right" label="部门" >
									<template #default="scope">
										<el-tag @click="handleDepartBanding(scope.row)" class="ml-2" type="success">{{ scope.row.departName }}</el-tag>
									</template>
								</el-table-column>
								<el-table-column fixed="right" label="操作" width="168">
									<template #default="scope">
										<el-row :gutter="20">
											<el-col :span="11">
												<el-button type="primary" size="small" @click="handleRoleBanding(scope.row)">角色配置</el-button>
											</el-col>
											<el-col :span="11">
												<el-button type="primary" size="small" @click="handleClickDetail(scope.row)">查看详情</el-button>
											</el-col>
										</el-row>
										<el-row :gutter="20">
											<el-col :span="11">
												<el-button type="primary" size="small" @click="handleUpdateUser(scope.row)">编辑用户</el-button>
											</el-col>
											<el-col :span="11">
												<el-popconfirm
													confirm-button-text="是的"
													cancel-button-text="点错了，抱歉"
													:icon="InfoFilled"
													icon-color="red"
													title="确定要删除吗?"
													@confirm="handleClickDelete(scope.row.id)"
												>
													<template #reference>
														<el-button type="danger" size="small">删除用户</el-button>
													</template>
												</el-popconfirm>
											</el-col>
										</el-row>
									</template>
								</el-table-column>
							</el-table>

							<div class="demo-pagination-block">
								<el-pagination
									v-model:currentPage="currentPage"
									v-model:page-size="pageSize"
									:page-sizes="[10, 50, 100, 200]"
									:small="small"
									:disabled="disabled"
									:background="background"
									layout="total, sizes, prev, pager, next, jumper"
									:total="total"
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
								/>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>

	<!-- 用户信息弹出框 -->
	<el-dialog v-model="dialogVisibleDetail" title="用户信息" width="50%" :before-close="handleDetailClose">
		<el-descriptions title="用户详细信息展示" :column="4" :border="true" direction="vertical">
			<el-descriptions-item label="用户id">{{ userDetail.id }}</el-descriptions-item>
			<el-descriptions-item label="用户名">{{ userDetail.username }}</el-descriptions-item>
			<el-descriptions-item label="邮箱">{{ userDetail.email }}</el-descriptions-item>
			<el-descriptions-item label="昵称">{{ userDetail.name }}</el-descriptions-item>
			<el-descriptions-item label="真实姓名">{{ userDetail.realName }}</el-descriptions-item>
			<el-descriptions-item label="手机">{{ userDetail.telephone }}</el-descriptions-item>
			<el-descriptions-item label="生日">{{ userDetail.birthday }}</el-descriptions-item>
			<el-descriptions-item label="性别">
				<template #default>
					<el-tag v-if="userDetail.sex === 1" size="small">男</el-tag>
					<el-tag v-else size="small">女</el-tag>
				</template>
			</el-descriptions-item>
			<el-descriptions-item label="创建者">{{ userDetail.creator }}</el-descriptions-item>
			<el-descriptions-item label="更新者">{{ userDetail.updater }}</el-descriptions-item>
			<el-descriptions-item label="创建时间">{{ userDetail.createTime }}</el-descriptions-item>
			<el-descriptions-item label="更新时间">{{ userDetail.updateTime }}</el-descriptions-item>
			<el-descriptions-item label="帐号启用状态">
				<template #default>
					<el-tag v-if="userDetail.status === true" size="small">启用</el-tag>
					<el-tag v-else size="small" type="danger">禁用</el-tag>
				</template>
			</el-descriptions-item>
			<el-descriptions-item label="备注">{{ userDetail.remark }}</el-descriptions-item>
		</el-descriptions>
		<template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleDetail = false">关闭</el-button>
      </span>
		</template>
	</el-dialog>

	<!-- 新增用户弹窗 -->
	<el-dialog v-model="dialogVisibleAddUser" title="新增用户" width="36%" :before-close="handleAddUserClose">
		<el-form ref="addUserRuleFormRef" :model="addUserRuleForm" :rules="addUserRules" label-width="120px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username" required>
				<el-input placeholder="请输入用户名" v-model="addUserRuleForm.username" />
			</el-form-item>
			<el-form-item label="密码" prop="password" required>
				<el-input placeholder="请输入密码" v-model="addUserRuleForm.password" />
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<el-input placeholder="请输入头像地址" v-model="addUserRuleForm.avatar" />
			</el-form-item>
			<el-form-item label="邮件" prop="email">
				<el-input placeholder="请输入邮件" v-model="addUserRuleForm.email" />
			</el-form-item>
			<el-form-item label="昵称" prop="name">
				<el-input placeholder="请输入昵称" v-model="addUserRuleForm.name" />
			</el-form-item>
			<el-form-item label="真实姓名" prop="realName">
				<el-input placeholder="请输入真实姓名" v-model="addUserRuleForm.realName" />
			</el-form-item>
			<el-form-item label="手机号" prop="telephone">
				<el-input placeholder="请输入手机号" v-model="addUserRuleForm.telephone" />
			</el-form-item>
			<el-form-item label="生日">
				<el-col :span="11">
					<el-form-item prop="birthday">
						<el-date-picker
							v-model="addUserRuleForm.birthday"
							type="datetime"
							format="YYYY-MM-DD HH:mm:ss"
							placeholder="Pick a date"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="addUserRuleForm.sex">
					<el-radio :label="1">男</el-radio>
					<el-radio :label="0">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input placeholder="请输入备注" v-model="addUserRuleForm.remark" type="textarea" />
			</el-form-item>
			<el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitAddUserForm(addUserRuleFormRef)">提交</el-button>
            <el-button type="warning" @click="resetForm(addUserRuleFormRef)">重置</el-button>
            <el-button @click="canalForm(addUserRuleFormRef)">关闭</el-button>
          </span>
			</el-form-item>
		</el-form>
	</el-dialog>

	<!-- 修改用户弹窗 -->
	<el-dialog v-model="dialogVisibleUpdateUser" title="修改用户" width="36%" :before-close="handleUpdateUserClose">
		<el-form :model="updateUserForm" ref="updateUserRuleFormRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="头像" prop="avatar">
				<el-input v-model="updateUserForm.avatar" />
			</el-form-item>
			<el-form-item label="邮件" prop="email">
				<el-input v-model="updateUserForm.email" />
			</el-form-item>
			<el-form-item label="昵称" prop="name">
				<el-input v-model="updateUserForm.name" />
			</el-form-item>
			<el-form-item label="真实姓名" prop="realName">
				<el-input v-model="updateUserForm.realName" />
			</el-form-item>
			<el-form-item label="手机号" prop="telephone">
				<el-input v-model="updateUserForm.telephone" />
			</el-form-item>
			<el-form-item label="生日">
				<el-col :span="11">
					<el-form-item prop="birthday">
						<el-date-picker
							v-model="updateUserForm.birthday"
							type="datetime"
							format="YYYY-MM-DD HH:mm:ss"
							placeholder="Pick a date"
							style="width: 100%"
						/>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="updateUserForm.sex">
					<el-radio :label="1">男</el-radio>
					<el-radio :label="0">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="updateUserForm.remark" type="textarea" />
			</el-form-item>
			<el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitUpdateUserForm">提交</el-button>
            <el-button type="warning" @click="resetForm(updateUserRuleFormRef)">重置</el-button>
          </span>
			</el-form-item>
		</el-form>
	</el-dialog>

	<!-- 绑定角色弹窗 -->
	<el-dialog v-model="dialogVisibleUpdateRole" title="绑定角色" width="36%" :before-close="handleUpdateRoleClose">
		<el-button type="primary" plain>当前角色：{{ roleNames }}</el-button>
		<el-form :model="updateRoleForm" ref="updateRoleRuleFormRef" label-width="120px" class="demo-ruleForm">
			到底应该单角色，还是支持多角色，应根据系统业务需求来定！这里保留多角色接口，需要时替换组件即可！
			<br />
			<br />
			<el-form-item label="选择角色" prop="roleIds">
				<el-select-v2
					v-model="value"
					:options="options"
					placeholder="Please select"
					size="large"
				/>
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitUpdateRoleForm">提交</el-button>
					<el-button @click="handleUpdateRoleClose(updateUserRuleFormRef)">关闭</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>

	<!-- 绑定部门弹窗 -->
	<el-dialog v-model="dialogVisibleUpdateDepart" title="绑定部门" width="36%" :before-close="handleUpdateDepartClose">
		<el-button type="primary" plain>当前部门：{{ departName }}</el-button>
		<el-form :model="updateDepartForm" ref="updateDepartRuleFormRef" label-width="120px" class="demo-ruleForm">
			<br />
			<br />
			<el-form-item label="选择部门" prop="departId">
				<el-tree-select
					v-model="departValue"
					:data="departData"
					:props="departProps"
				>
					<template #default="{ data: { departName } }">
						{{ departName }}
					</template>
				</el-tree-select>
			</el-form-item>
			<el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitUpdateDepartForm">提交</el-button>
            <el-button @click="handleUpdateDepartClose(updateDepartRuleFormRef)">关闭</el-button>
          </span>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { AddUser, ChangeStatus, DeleteUser, List, UpdateUser, UpdateUserDepart, UpdateUserRole } from '@/api/modules/auth/user'
import { GetRoleByUserId, GetRoleDict } from '@/api/modules/auth/role'
import { GetUserDepartList } from '@/api/modules/auth/depart'
import { Avatar, InfoFilled, Search } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { User } from '@/api/interface/auth/user'

interface Tree {
	queryParam: any;
	departName: string
	departId: number
	children?: Tree[]
}

const departProps = {
	children: 'children',
	label: 'departName',
	value: 'departId'
}

const departData = ref<Tree[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const userList = ref([])
const userDetail = ref({})
const loading = ref<boolean>(false)
const dialogVisibleDetail = ref<boolean>(false)
const dialogVisibleAddUser = ref<boolean>(false)
const dialogVisibleUpdateUser = ref<boolean>(false)
const dialogVisibleUpdateRole = ref<boolean>(false)
const dialogVisibleUpdateDepart = ref<boolean>(false)
const value = ref<Array<number>>()
const departValue = ref<Array<number>>()
const roleNames = ref<Array<String>>()
const departName = ref<Array<String>>()
const options = ref([{
	label: '',
	value: 0
}])

const addUserRuleFormRef = ref<FormInstance>()
const updateUserRuleFormRef = ref<FormInstance>()
const updateRoleRuleFormRef = ref<FormInstance>()
const updateDepartRuleFormRef = ref<FormInstance>()

const data = reactive({
	form: {},
	queryParam: {
		pageNum: 1,
		pageSize: 10,
		queryKey: '',
		departId: 0
	}
})

const addUserRuleForm = reactive<User.AddUserRequestData>({
	/** 用户名 */
	username: undefined,
	/** 密码 */
	password: undefined,
	/** 头像 */
	avatar: undefined,
	/** 邮箱 */
	email: undefined,
	/** 昵称 */
	name: undefined,
	/** 真实姓名 */
	realName: undefined,
	/** 手机号 */
	telephone: undefined,
	/** 生日 */
	birthday: new Date(),
	/** 性别 */
	sex: 1,
	/** 备注 */
	remark: undefined,
})

const updateUserForm = reactive<User.UpdateUserRequestData>({
	/** 用户 id */
	id: 0,
	/** 头像 */
	avatar: undefined,
	/** 邮箱 */
	email: undefined,
	/** 昵称 */
	name: undefined,
	/** 真实姓名 */
	realName: undefined,
	/** 手机号 */
	telephone: undefined,
	/** 生日 */
	birthday: undefined,
	/** 性别 */
	sex: undefined,
	/** 备注 */
	remark: undefined,
})

const updateRoleForm = reactive<User.UpdateUserRoleRequestData>({
	/** 用户 id */
	userId: 0,
	/** 角色 id 列表 */
	roleIds: []
})

const updateDepartForm = reactive<User.UpdateUserDepartRequestData>({
	/** 用户 id */
	userId: 0,
	/** 部门 id */
	departId: 0
})

const addUserRules = reactive({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 6, max: 20, message: '长度在 6~20 之间', trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 20, message: '长度在 12~20 之间', trigger: 'blur' },
	],
})

const handleDepartNodeClick = (tree: Tree) => {
	data.queryParam.departId = tree.departId
	getUserList()
}

/** 获取部门字典 */
const getDepartDict = () => {
	loading.value = true
	GetUserDepartList().then((res: any) => {
		loading.value = false
		departData.value = res.data
	});
}

/** 获取用户列表 */
const getUserList = () => {
	loading.value = true
	List(data.queryParam).then((res: any) => {
		loading.value = false
		let dataList = res.data.list
		for (const dataListKey in dataList) {
			let data = dataList[dataListKey]
			data.status = data.status === 1
		}
		userList.value = dataList
		total.value = res.data.total
	});
}

/** 更改用户可用状态 */
const changeStatusFetch = (data: User.ChangeUserStatusRequestData) => {
	ChangeStatus(data).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
		}
	})
}

/** 页大小调整 */
const handleSizeChange = (val: number) => {
	data.queryParam.pageSize = val
	getUserList()
}

/** 页码调整 */
const handleCurrentChange = (val: number) => {
	data.queryParam.pageNum = val
	getUserList()
}

/** 搜索 */
const handleSearchChange = async () => {
	await getUserList()
	await getDepartDict()
}

/** 详情 */
const handleClickDetail = (data: any) => {
	userDetail.value = data
	dialogVisibleDetail.value = true
}

/** 删除用户 */
const handleClickDelete = (data: number) => {
	DeleteUser(data).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
			getUserList()
		}
	})
}

/** 是否启用变更 */
const handleChangeStatus = (val: any) => {
	const data : User.ChangeUserStatusRequestData = {
		userId: val.id,
		status: val.status
	}
	changeStatusFetch(data)
}

/** 用户信息弹窗关闭处理 */
const handleDetailClose = () => {
	userDetail.value = {}
	dialogVisibleDetail.value = false
}

/** 新增用户弹窗关闭处理 */
const handleAddUserClose = () => {
	addUserRuleFormRef.value?.resetFields()
	dialogVisibleAddUser.value = false
}

/** 更新用户弹窗关闭处理 */
const handleUpdateUserClose = () => {
	updateUserRuleFormRef.value?.resetFields()
	dialogVisibleUpdateUser.value = false
}

/** 新增用户处理 */
const handleAddUser = () => {
	dialogVisibleAddUser.value = true
}

/** 更新用户处理 */
const handleUpdateUser = (val: any) => {
	updateUserForm.id = val.id
	updateUserForm.avatar = val.avatar
	updateUserForm.email = val.email
	updateUserForm.name = val.name
	updateUserForm.realName = val.realName
	updateUserForm.telephone = val.telephone
	updateUserForm.birthday = val.birthday
	updateUserForm.sex = val.sex
	updateUserForm.remark = val.remark
	dialogVisibleUpdateUser.value = true
}

/** 新增用户提交表单 */
const submitAddUserForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid: any, fields: any) => {
		if (valid) {
			AddUser(addUserRuleForm).then((res: any) => {
				if (res.code === 200) {
					ElNotification({
						title: '成功！',
						message: res.message,
						type: 'success',
					})
					formEl.resetFields()
					dialogVisibleAddUser.value = false
					getUserList()
				} else {
					ElNotification({
						title: '失败！',
						message: res.message,
						type: 'error',
					})
				}
			})
		} else {
			console.log('error submit!', fields)
		}
	})
}

/** 更新用户提交表单 */
const submitUpdateUserForm = async () => {
	await UpdateUser(updateUserForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
			getUserList()
		} else {
			ElNotification({
				title: '失败！',
				message: res.message,
				type: 'error',
			})
		}
		handleUpdateUserClose()
	})
}

/** 重置表单 */
const resetForm = (formEl: FormInstance | undefined) => {
	formEl?.resetFields()
	formEl?.clearValidate()
}

/** 关闭表单 */
const canalForm = (formEl: FormInstance | undefined) => {
	formEl?.resetFields()
	formEl?.clearValidate()
	dialogVisibleAddUser.value = false
	dialogVisibleUpdateUser.value = false
}

/** 角色绑定弹窗 */
const handleRoleBanding = async (val: any) => {
	updateRoleForm.userId = val.id
	await GetRoleDict().then((res: any) => {
		let roleDict: { value: string; label: string }[]
		roleDict = res.data.map((i: any) => ({
			value: i.roleId,
			label: i.roleName
		}))
		// @ts-ignore
		options.value = roleDict
	})
	await GetRoleByUserId(val.id).then((res: any) => {
		let data = res.data
		roleNames.value = data[0].roleName
	})
	dialogVisibleUpdateRole.value = true
	updateRoleForm.userId = val.id
}

/** 角色绑定提交 */
const submitUpdateRoleForm = async () => {
	let roleIds: Array<number> = []
	// @ts-ignore
	roleIds.push(value.value)
	updateRoleForm.roleIds = roleIds
	await UpdateUserRole(updateRoleForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
			getUserList()
		} else {
			ElNotification({
				title: '失败！',
				message: res.message,
				type: 'error',
			})
		}
		handleUpdateRoleClose()
	})
}

/** 角色绑定关闭 */
const handleUpdateRoleClose = () => {
	dialogVisibleUpdateRole.value = false
}

/** 部门绑定弹窗 */
const handleDepartBanding = async (val: any) => {
	updateDepartForm.userId = val.id
	departName.value = val.departName
	departValue.value = val.departName
	dialogVisibleUpdateDepart.value = true
}

/** 部门绑定提交 */
const submitUpdateDepartForm = async () => {
	// @ts-ignore
	updateDepartForm.departId = departValue.value
	await UpdateUserDepart(updateDepartForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
			getUserList()
			getDepartDict()
		} else {
			ElNotification({
				title: '失败！',
				message: res.message,
				type: 'error',
			})
		}
		handleUpdateDepartClose()
	})
}

/** 部门绑定关闭 */
const handleUpdateDepartClose = () => {
	updateDepartForm.departId = 0
	updateDepartForm.userId = 0
	dialogVisibleUpdateDepart.value = false
}

getUserList()
getDepartDict()
</script>
