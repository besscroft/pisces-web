<template>
	<div class="common-layout">
		<el-container style="height: 100%">
			<el-header style="margin-top: 12px">
				<el-card class="box-card">
					角色管理
					<el-input style="width: 20%" v-model="data.queryParam.queryKey" placeholder="请输入搜索项" :prefix-icon="Search" clearable />
					<el-button style="margin-left: 4px" type="primary" @click="handleSearchChange" :icon="Search">
						搜索
					</el-button>
					<el-button style="margin-left: 4px" type="primary" @click="handleAddRole" :icon="Pointer">
						新增角色
					</el-button>
				</el-card>
			</el-header>
			<el-main>
				<el-card class="box-card">
					<el-table v-loading="loading" border :data="roleList" style="width: 100%">
						<el-table-column prop="roleName" label="角色名称" />
						<el-table-column prop="roleCode" label="角色编码" />
						<el-table-column prop="description" label="描述" />
						<el-table-column prop="createTime" label="创建时间" sortable />
						<el-table-column prop="updateTime" label="更新时间" sortable />
						<el-table-column prop="status" label="角色启用状态">
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
						<el-table-column fixed="right" label="操作" width="168">
							<template #default="scope">
								<el-row :gutter="20">
									<el-col :span="11">
										<el-button type="primary" size="small" @click="handleMenuBanding(scope.row)">菜单配置</el-button>
									</el-col>
									<el-col :span="11">
										<el-button type="primary" size="small" @click="handleResourceBanding(scope.row)">资源配置</el-button>
									</el-col>
								</el-row>
								<el-row :gutter="20">
									<el-col :span="11">
										<el-button type="primary" size="small" @click="handleUpdateRole(scope.row)">编辑角色</el-button>
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
												<el-button type="danger" size="small">删除角色</el-button>
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
			</el-main>
		</el-container>
	</div>

	<!-- 菜单绑定弹窗 -->
	<el-dialog v-model="dialogMenuVisible" title="菜单绑定" width="30%" :before-close="handleMenuClose">
		<el-tree
			ref="treeMenuRef"
			:data="menuDataList"
			:props="menuProps"
			node-key="id"
			:default-checked-keys="menuDataListByRoleId"
			default-expand-all="false"
			check-strictly="true"
			show-checkbox />
		<template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleMenuSubmit">提交</el-button>
        <el-button @click="dialogMenuVisible = false">关闭</el-button>
      </span>
		</template>
	</el-dialog>

	<!-- 角色绑定弹窗 -->
	<el-dialog v-model="dialogResourceVisible" title="角色绑定绑定" width="30%" :before-close="handleResourceClose">
		<el-tree
			ref="treeResourceRef"
			:data="resourceDataList"
			:props="resourceProps"
			node-key="id"
			:default-checked-keys="resourceDataListByRoleId"
			default-expand-all="false"
			show-checkbox />
		<template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleResourceSubmit">提交</el-button>
        <el-button @click="dialogResourceVisible = false">关闭</el-button>
      </span>
		</template>
	</el-dialog>

	<!-- 新增角色弹窗 -->
	<el-dialog v-model="dialogAddRoleVisible" title="新增角色" width="30%" :before-close="handleAddRoleClose">
		<el-form :model="addRoleRuleForm" ref="formAddRoleRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="角色名称" prop="roleName">
				<el-input placeholder="请输入角色名称" v-model="addRoleRuleForm.roleName" />
			</el-form-item>
			<el-form-item label="角色编码" prop="roleCode">
				<el-input placeholder="请输入角色编码" v-model="addRoleRuleForm.roleCode" />
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input placeholder="请输入角色排序" v-model="addRoleRuleForm.sort" />
			</el-form-item>
			<el-form-item label="描述" prop="description">
				<el-input
					v-model="addRoleRuleForm.description"
					:rows="2"
					type="textarea"
					placeholder="请输入角色描述"
				/>
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitAddRoleForm">提交</el-button>
					<el-button type="warning" @click="resetRoleForm(formAddRoleRef)">重置</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>

	<!-- 更新角色弹窗 -->
	<el-dialog v-model="dialogUpdateRoleVisible" title="新增角色" width="30%" :before-close="handleUpdateRoleClose">
		<el-form :model="updateRoleRuleForm" ref="formUpdateRoleRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="角色名称" prop="roleName">
				<el-input v-model="updateRoleRuleForm.roleName" />
			</el-form-item>
			<el-form-item label="角色编码" prop="roleCode">
				<el-input v-model="updateRoleRuleForm.roleCode" />
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input v-model="updateRoleRuleForm.sort" />
			</el-form-item>
			<el-form-item label="描述" prop="description">
				<el-input
					v-model="updateRoleRuleForm.description"
					:rows="2"
					type="textarea"
				/>
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitUpdateRoleForm">提交</el-button>
					<el-button type="warning" @click="resetRoleForm(formUpdateRoleRef)">重置</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Search, InfoFilled, Pointer } from '@element-plus/icons-vue'
import { ElMessage, ElTree, FormInstance } from 'element-plus'
import { ChangeStatus, UpdateMenu, UpdateResource, DeleteRoleById, List, AddRole, UpdateRole } from '@/api/modules/auth/role'
import { FindMenuIdsByRoleId, GetAllMenu } from '@/api/modules/auth/menu'
import { TreeKey } from 'element-plus/es/components/tree-v2/src/types'
import { FindResourceIdsByRoleId, GetAllResource } from '@/api/modules/auth/resource'
import { Role } from '@/api/interface/auth/role'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const roleList = ref([])
const loading = ref<boolean>(false)
const dialogMenuVisible = ref(false)
const dialogResourceVisible = ref(false)
const dialogAddRoleVisible = ref(false)
const dialogUpdateRoleVisible = ref(false)
const menuDataList = ref([])
const menuDataListByRoleId = ref([])
const resourceDataList = ref([])
const resourceDataListByRoleId = ref([])
const roleId = ref<number>(0)

const treeMenuRef = ref<InstanceType<typeof ElTree>>()
const treeResourceRef = ref<InstanceType<typeof ElTree>>()

const formAddRoleRef = ref<FormInstance>()
const formUpdateRoleRef = ref<FormInstance>()

const menuProps = {
	children: 'children',
	label: 'title'
}

const resourceProps = {
	children: 'children',
	label: 'name'
}

const data = reactive({
	form: {},
	queryParam: {
		pageNum: 1,
		pageSize: 10,
		queryKey: ''
	},
})

const addRoleRuleForm = reactive<Role.AddRoleRequestData>({
	/** 角色名称 */
	roleName: '',
	/** 角色编码 */
	roleCode: '',
	/** 描述 */
	description: '',
	/** 排序 */
	sort: 2
})

const updateRoleRuleForm = reactive<Role.UpdateRoleRequestData>({
	/** 角色 id */
	id: undefined,
	/** 角色名称 */
	roleName: '',
	/** 角色编码 */
	roleCode: '',
	/** 描述 */
	description: '',
	/** 排序 */
	sort: 2
})

/** 获取角色列表 */
const getRoleList = () => {
	loading.value = true
	List(data.queryParam).then((res: any) => {
		loading.value = false
		let dataList = res.data.list
		for (const dataListKey in dataList) {
			let data = dataList[dataListKey]
			if (data.status === 1) {
				data.status = true
			} else {
				data.status = false
			}
		}
		roleList.value = dataList
		total.value = res.data.total
	});
}

/** 页大小调整 */
const handleSizeChange = (val: number) => {
	data.queryParam.pageSize = val
	getRoleList()
}

/** 页码调整 */
const handleCurrentChange = (val: number) => {
	data.queryParam.pageNum = val
	getRoleList()
}

/** 搜索 */
const handleSearchChange = () => {
	getRoleList()
}

/** 是否启用变更 */
const handleChangeStatus = (val: any) => {
	const data: Role.ChangeRoleStatusRequestData = {
		roleId: val.id,
		status: val.status
	}
	changeStatusFetch(data)
}

/** 更改角色可用状态 */
const changeStatusFetch = (data: Role.ChangeRoleStatusRequestData) => {
	ChangeStatus(data).then((res: any) => {
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				type: 'success',
				message: res.message
			})
		} else {
			ElMessage({
				showClose: true,
				type: 'error',
				message: res.message
			})
		}
	})
}

/** 角色删除 */
const handleClickDelete = (val: number) => {
	DeleteRoleById(val).then((res: any) => {
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				type: 'success',
				message: res.message
			})
		} else {
			ElMessage({
				showClose: true,
				type: 'error',
				message: res.message
			})
		}
		getRoleList()
	})
}

/** 菜单绑定弹窗 */
const handleMenuBanding = (val: any) => {
	dialogMenuVisible.value = true
	menuDataListByRoleId.value = []
	roleId.value = val.id
	GetAllMenu().then((res: any) => {
		if (res.code === 200) {
			menuDataList.value = res.data
		}
	})
	FindMenuIdsByRoleId(val.id).then((res: any) => {
		if (res.code === 200) {
			menuDataListByRoleId.value = res.data
		}
	})
}

/** 菜单绑定弹窗提交处理 */
const handleMenuSubmit = () => {
	dialogMenuVisible.value = false
	let parentTree = treeMenuRef.value!.getHalfCheckedKeys()
	let childTree = treeMenuRef.value!.getCheckedKeys(false)
	const menuTreeData: Array<TreeKey> = [...parentTree, ...childTree];
	UpdateMenu(roleId.value, menuTreeData).then((res: any) =>{
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				type: 'success',
				message: res.message
			})
		}
	})
}

/** 菜单绑定弹窗关闭处理 */
const handleMenuClose = () => {
	menuDataListByRoleId.value = []
	dialogMenuVisible.value = false
}

/** 资源绑定弹窗 */
const handleResourceBanding = (val: any) => {
	dialogResourceVisible.value = true
	resourceDataListByRoleId.value = []
	roleId.value = val.id
	GetAllResource().then((res: any) => {
		if (res.code === 200) {
			resourceDataList.value = res.data
		}
	})
	FindResourceIdsByRoleId(val.id).then((res: any) => {
		if (res.code === 200) {
			resourceDataListByRoleId.value = res.data
		}
	})
}

/** 资源绑定弹窗提交处理 */
const handleResourceSubmit = () => {
	dialogResourceVisible.value = false
	let childTree = treeResourceRef.value!.getCheckedKeys(true)
	UpdateResource(roleId.value, childTree).then((res: any) =>{
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				type: 'success',
				message: res.message
			})
		}
	})
}

/** 资源绑定弹窗关闭处理 */
const handleResourceClose = () => {
	resourceDataListByRoleId.value = []
	dialogResourceVisible.value = false
}

/** 新增角色处理 */
const handleAddRole = () => {
	dialogAddRoleVisible.value = true
}

/** 新增角色提交 */
const submitAddRoleForm = () => {
	AddRole(addRoleRuleForm).then((res: any) => {
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				type: 'success',
				message: res.message
			})
		}
		handleAddRoleClose()
		getRoleList()
	})
}

/** 新增角色弹窗关闭处理 */
const handleAddRoleClose = () => {
	formAddRoleRef.value?.resetFields()
	dialogAddRoleVisible.value = false
}

/** 重置表单 */
const resetRoleForm = (formEl: FormInstance | undefined) => {
	formEl?.resetFields()
}

/** 更新角色处理 */
const handleUpdateRole = (val: any) => {
	updateRoleRuleForm.id = val.id
	updateRoleRuleForm.roleName = val.roleName
	updateRoleRuleForm.roleCode = val.roleCode
	updateRoleRuleForm.description = val.description
	updateRoleRuleForm.sort = val.sort
	dialogUpdateRoleVisible.value = true
}

/** 更新角色弹窗关闭处理 */
const handleUpdateRoleClose = () => {
	formUpdateRoleRef.value?.resetFields()
	dialogUpdateRoleVisible.value = false
}

/** 更新角色提交 */
const submitUpdateRoleForm = () => {
	UpdateRole(updateRoleRuleForm).then((res: any) => {
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				type: 'success',
				message: res.message
			})
		}
		handleUpdateRoleClose()
		getRoleList()
	})
}

getRoleList()
</script>
