<template>
	<div class="common-layout">
		<el-container style="height: 100%">
			<el-header style="margin-top: 12px">
				<el-card class="box-card">
					菜单管理
					<el-input style="width: 20%" v-model="data.queryParam.queryKey" placeholder="请输入搜索项" :prefix-icon="Search" clearable />
					<el-button style="margin-left: 4px" type="primary" @click="handleSearchChange" :icon="Search">
						搜索
					</el-button>
					<el-button style="margin-left: 4px" type="primary" @click="handleAddMenu" :icon="Pointer">
						新增菜单
					</el-button>
				</el-card>
			</el-header>
			<el-main>
				<el-card class="box-card">
					<el-table :data="menuList" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
						<el-table-column prop="title" label="菜单名称" width="180" />
						<el-table-column prop="name" label="前端名称" width="180" />
						<el-table-column prop="path" label="路由地址" width="180" />
						<el-table-column prop="component" label="组件路径"/>
						<el-table-column prop="createTime" label="创建时间" sortable width="180" />
						<el-table-column prop="updateTime" label="更新时间" sortable width="180" />
						<el-table-column prop="hidden" label="菜单显示状态" width="100">
							<template #default="scope">
								<el-switch
									v-model="scope.row.isHide"
									inline-prompt
									active-text="是"
									inactive-text="否"
									@change="handleChangeStatus(scope.row)"
								/>
							</template>
						</el-table-column>
						<el-table-column label="操作" align="right" width="150">
							<template #default="scope">
								<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
								<el-popconfirm
									confirm-button-text="是的"
									cancel-button-text="点错了，抱歉"
									icon-color="red"
									title="确定要删除吗?"
									@confirm="handleDelete(scope.row.id)"
								>
									<template #reference>
										<el-button
											size="small"
											type="danger">删除</el-button>
									</template>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-main>
		</el-container>
	</div>

	<!-- 新增菜单弹窗 -->
	<el-dialog v-model="dialogVisibleAddMenu" title="新增菜单" width="36%" :before-close="handleAddMenuClose">
		<el-form :model="addMenuForm" ref="formAddMenuRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="父菜单选择" prop="title">
				<el-cascader :options="options" :props="props1" @change="handleChange" clearable />
			</el-form-item>
			<el-form-item label="菜单名称" prop="title">
				<el-input v-model="addMenuForm.title" />
			</el-form-item>
			<el-form-item label="前端名称" prop="name">
				<el-input v-model="addMenuForm.name" />
			</el-form-item>
			<el-form-item label="菜单级数" prop="level">
				<el-input v-model="addMenuForm.level" />
			</el-form-item>
			<el-form-item label="组件路径" prop="component">
				<el-input v-model="addMenuForm.component" />
			</el-form-item>
			<el-form-item label="路由地址" prop="path">
				<el-input v-model="addMenuForm.path" />
			</el-form-item>
			<el-form-item label="菜单图标名称" prop="icon">
				<el-input v-model="addMenuForm.icon" />
			</el-form-item>
			<el-form-item label="菜单排序" prop="sort">
				<el-input v-model="addMenuForm.sort" />
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitAddMenuForm">提交</el-button>
					<el-button type="warning" @click="resetMenuForm(formAddMenuRef)">重置</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>

	<!-- 修改菜单弹窗 -->
	<el-dialog v-model="dialogVisibleUpdateMenu" title="修改菜单" width="36%" :before-close="handleUpdateMenuClose">
		<el-form :model="updateMenuForm" ref="formUpdateMenuRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="父菜单选择" prop="title">
				<el-cascader :options="options" :props="props1" v-model="changeValue" @change="handleChange" clearable />
			</el-form-item>
			<el-form-item label="菜单名称" prop="title">
				<el-input v-model="updateMenuForm.title" />
			</el-form-item>
			<el-form-item label="前端名称" prop="name">
				<el-input v-model="updateMenuForm.name" />
			</el-form-item>
			<el-form-item label="菜单级数" prop="level">
				<el-input v-model="updateMenuForm.level" />
			</el-form-item>
			<el-form-item label="组件路径" prop="component">
				<el-input v-model="updateMenuForm.component" />
			</el-form-item>
			<el-form-item label="路由地址" prop="path">
				<el-input v-model="updateMenuForm.path" />
			</el-form-item>
			<el-form-item label="菜单图标名称" prop="icon">
				<el-input v-model="updateMenuForm.icon" />
			</el-form-item>
			<el-form-item label="菜单排序" prop="sort">
				<el-input v-model="updateMenuForm.sort" />
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitUpdateMenuForm">提交</el-button>
					<el-button type="warning" @click="resetMenuForm(formUpdateMenuRef)">重置</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Search, Pointer } from '@element-plus/icons-vue'
import { List, ChangeStatus, DeleteMenu, UpdateMenu, AddMenu, GetMenuDict } from '@/api/modules/auth/menu'
import { Menu } from '@/api/interface/auth/menu'

const menuList = ref([])
const loading = ref<boolean>(false)
const dialogVisibleUpdateMenu = ref<boolean>(false)
const dialogVisibleAddMenu = ref<boolean>(false)
const options = ref([])
const props1 = {
	multiple: false,
	checkStrictly: true,
}
const changeValue = ref<number>()

const formAddMenuRef = ref<FormInstance>()
const formUpdateMenuRef = ref<FormInstance>()

const data = reactive({
	form: {},
	queryParam: {
		pageNum: 1,
		pageSize: 10,
		queryKey: ''
	},
})

const addMenuForm = reactive<Menu.AddMenuRequestData>({
	/** 父级菜单 id */
	parentId: undefined,
	/** 菜单名称 */
	title: undefined,
	/** 前端名称 */
	name: undefined,
	/** 菜单级数 */
	level: 0,
	/** 组件路径 */
	component: undefined,
	/** 路由地址 */
	path: undefined,
	/** 菜单图标名称 */
	icon: undefined,
	/** 菜单排序 */
	sort: 1
})

const updateMenuForm = reactive<Menu.UpdateMenuRequestData>({
	/** 菜单id */
	id: 0,
	/** 父级菜单 id */
	parentId: undefined,
	/** 菜单名称 */
	title: undefined,
	/** 前端名称 */
	name: undefined,
	/** 菜单级数 */
	level: 0,
	/** 组件路径 */
	component: undefined,
	/** 路由地址 */
	path: undefined,
	/** 菜单图标名称 */
	icon: undefined,
	/** 菜单排序 */
	sort: 1
})

/** 获取菜单列表 */
const getMenuList = () => {
	loading.value = true
	List(data.queryParam).then((res: any) => {
		loading.value = false
		let dataList = res.data
		for (const dataListKey in dataList) {
			let data = dataList[dataListKey]
			menuHiddenHandle(data)
		}
		menuList.value = dataList
	});
}

/** 菜单递归处理 */
const menuHiddenHandle = (data: any) => {
	if (data.isHide === 1) {
		data.isHide = true
	} else {
		data.isHide = false
	}
	if (data.children != undefined) {
		let cld = data.children
		for (const dataListKey in cld) {
			let c = cld[dataListKey]
			menuHiddenHandle(c)
		}
	}
}

/** 菜单可用状态更新 */
const handleChangeStatus = (val: any) => {
	const data: Menu.ChangeMenuStatusRequestData = {
		menuId: val.id,
		isHide: val.isHide
	}
	changeStatusFetch(data)
}

/** 更改菜单可用状态 */
const changeStatusFetch = (data: Menu.ChangeMenuStatusRequestData) => {
	ChangeStatus(data).then((res: any) => {
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				type: 'success',
				message: res.message
			})
		}
	})
}

/** 编辑按钮 */
const handleEdit = async (val: any) => {
	updateMenuForm.id = val.id
	updateMenuForm.title = val.title
	updateMenuForm.name = val.name
	updateMenuForm.level = val.level
	updateMenuForm.component = val.component
	updateMenuForm.path = val.path
	updateMenuForm.icon = val.icon
	updateMenuForm.sort = val.sort
	changeValue.value = val.parentId
	await GetMenuDict().then(res => {
		let resData = res.data
		let data = resData.data
		options.value = data
	})
	dialogVisibleUpdateMenu.value = true
}

/** 更新菜单弹窗关闭处理 */
const handleUpdateMenuClose = () => {
	updateMenuForm.id = 0
	updateMenuForm.parentId = undefined
	updateMenuForm.title = undefined
	updateMenuForm.name = undefined
	updateMenuForm.level = 0
	updateMenuForm.component = undefined
	updateMenuForm.path = undefined
	updateMenuForm.icon = undefined
	updateMenuForm.sort = 1
	changeValue.value = undefined
	dialogVisibleUpdateMenu.value = false
}

/** 菜单更新提交 */
const submitUpdateMenuForm = async () => {
	updateMenuForm.parentId = changeValue.value
	await UpdateMenu(updateMenuForm).then((res: any) => {
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				message: res.message,
				type: 'success'
			})
			handleUpdateMenuClose()
			getMenuList()
		} else {
			ElMessage({
				showClose: true,
				message: res.message,
				type: 'error'
			})
		}
	})
}

/** 删除菜单 */
const handleDelete = (data: number) => {
	DeleteMenu(data).then((res: any) => {
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				type: 'success',
				message: res.message
			})
			getMenuList()
		}
	})
}

/** 搜索 */
const handleSearchChange = () => {
	getMenuList()
}

/** 菜单字典选择处理 */
const handleChange = (value: any) => {
	if (value.length > 1) {
		changeValue.value = value[value.length -1]
	} else {
		changeValue.value = value[0]
	}
}

/** 新增菜单按钮 */
const handleAddMenu = async () => {
	addMenuForm.parentId = undefined
	await GetMenuDict().then((res: any) => {
		let data = res.data
		options.value = data
	})
	dialogVisibleAddMenu.value = true
}

/** 关闭新增菜单弹窗 */
const handleAddMenuClose = () => {
	updateMenuForm.id = 0
	updateMenuForm.parentId = undefined
	updateMenuForm.title = undefined
	updateMenuForm.name = undefined
	updateMenuForm.level = 0
	updateMenuForm.component = undefined
	updateMenuForm.path = undefined
	updateMenuForm.icon = undefined
	updateMenuForm.sort = 1
	changeValue.value = undefined
	dialogVisibleAddMenu.value = false
}

/** 新增菜单提交 */
const submitAddMenuForm = async () => {
	addMenuForm.parentId = changeValue.value
	await AddMenu(addMenuForm).then((res: any) => {
		if (res.code === 200) {
			ElMessage({
				showClose: true,
				message: res.message,
				type: 'success'
			})
			handleAddMenuClose()
			getMenuList()
		} else {
			ElMessage({
				showClose: true,
				message: res.message,
				type: 'error'
			})
		}
	})
}

/** 重置按钮 */
const resetMenuForm = (formEl: FormInstance | undefined) => {
	changeValue.value = undefined
	formEl?.resetFields()
}

getMenuList()
</script>
