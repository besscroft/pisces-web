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
						<el-table-column prop="component" label="组件路径" />
						<el-table-column prop="redirect" label="重定向地址" />
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
						<el-table-column label="操作" align="right">
							<template #default="scope">
								<el-row :gutter="20">
									<el-col :span="6">
										<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
									</el-col>
									<el-col :span="8">
										<el-button type="primary" size="small" @click="handleClickDetail(scope.row)">查看详情</el-button>
									</el-col>
									<el-col :span="6">
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
									</el-col>
								</el-row>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-main>
		</el-container>
	</div>

	<!-- 新增菜单弹窗 -->
	<el-dialog v-model="dialogVisibleAddMenu" title="新增菜单" width="42%" :before-close="handleAddMenuClose">
		<el-form :model="addMenuForm" ref="formAddMenuRef" label-width="160px" class="demo-ruleForm">
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
			<el-form-item label="重定向地址" prop="redirect">
				<el-input v-model="addMenuForm.redirect" />
			</el-form-item>
			<el-form-item label="路由地址" prop="path">
				<el-input v-model="addMenuForm.path" />
			</el-form-item>
			<el-form-item label="菜单图标名称" prop="icon">
				<el-input v-model="addMenuForm.icon" />
			</el-form-item>
			<el-form-item label="外链（如果有填地址）" prop="isLink">
				<el-input v-model="addMenuForm.isLink" />
			</el-form-item>
			<el-form-item label="菜单显示状态" prop="isHide">
				<el-switch
					v-model="addMenuForm.isHide"
					inline-prompt
					active-text="启用"
					inactive-text="禁用"
				/>
			</el-form-item>
			<el-form-item label="是否全屏" prop="isFull">
				<el-switch
					v-model="addMenuForm.isFull"
					inline-prompt
					active-text="是"
					inactive-text="否"
				/>
			</el-form-item>
			<el-form-item label="是否固定在 tabs nav" prop="isAffix">
				<el-switch
					v-model="addMenuForm.isAffix"
					inline-prompt
					active-text="固定"
					inactive-text="不固定"
				/>
			</el-form-item>
			<el-form-item label="是否缓存" prop="isKeepAlive">
				<el-switch
					v-model="addMenuForm.isKeepAlive"
					inline-prompt
					active-text="缓存"
					inactive-text="不缓存"
				/>
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
	<el-dialog v-model="dialogVisibleUpdateMenu" title="修改菜单" width="42%" :before-close="handleUpdateMenuClose">
		<el-form :model="updateMenuForm" ref="formUpdateMenuRef" label-width="160px" class="demo-ruleForm">
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
			<el-form-item label="重定向地址" prop="redirect">
				<el-input v-model="updateMenuForm.redirect" />
			</el-form-item>
			<el-form-item label="路由地址" prop="path">
				<el-input v-model="updateMenuForm.path" />
			</el-form-item>
			<el-form-item label="菜单图标名称" prop="icon">
				<el-input v-model="updateMenuForm.icon" />
			</el-form-item>
			<el-form-item label="外链（如果有填地址）" prop="isLink">
				<el-input v-model="updateMenuForm.isLink" />
			</el-form-item>
			<el-form-item label="菜单显示状态" prop="isHide">
				<el-switch
					v-model="updateMenuForm.isHide"
					inline-prompt
					active-text="启用"
					inactive-text="禁用"
				/>
			</el-form-item>
			<el-form-item label="是否全屏" prop="isFull">
				<el-switch
					v-model="updateMenuForm.isFull"
					inline-prompt
					active-text="是"
					inactive-text="否"
				/>
			</el-form-item>
			<el-form-item label="是否固定在 tabs nav" prop="isAffix">
				<el-switch
					v-model="updateMenuForm.isAffix"
					inline-prompt
					active-text="固定"
					inactive-text="不固定"
				/>
			</el-form-item>
			<el-form-item label="是否缓存" prop="isKeepAlive">
				<el-switch
					v-model="updateMenuForm.isKeepAlive"
					inline-prompt
					active-text="缓存"
					inactive-text="不缓存"
				/>
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

	<!-- 菜单信息弹出框 -->
	<el-dialog v-model="dialogVisibleDetail" title="菜单信息" width="50%" :before-close="handleDetailClose">
		<el-descriptions title="菜单详细信息展示" :column="4" :border="true" direction="vertical">
			<el-descriptions-item label="菜单id">{{ menuDetail.id }}</el-descriptions-item>
			<el-descriptions-item label="菜单名称">{{ menuDetail.title }}</el-descriptions-item>
			<el-descriptions-item label="前端名称">{{ menuDetail.name }}</el-descriptions-item>
			<el-descriptions-item label="父菜单名称">{{ menuDetail.parentTitle }}</el-descriptions-item>
			<el-descriptions-item label="菜单级数">{{ menuDetail.level }}</el-descriptions-item>
			<el-descriptions-item label="组件路径">{{ menuDetail.component }}</el-descriptions-item>
			<el-descriptions-item label="重定向地址">{{ menuDetail.redirect }}</el-descriptions-item>
			<el-descriptions-item label="路由地址">{{ menuDetail.path }}</el-descriptions-item>
			<el-descriptions-item label="菜单图标名称">{{ menuDetail.icon }}</el-descriptions-item>
			<el-descriptions-item label="外链">{{ menuDetail.isLink }}</el-descriptions-item>
			<el-descriptions-item label="菜单显示状态">
				<template #default>
					<el-tag v-if="menuDetail.isHide === true" size="small">显示</el-tag>
					<el-tag v-else size="small" type="danger">禁用</el-tag>
				</template>
			</el-descriptions-item>
			<el-descriptions-item label="是否全屏">
				<template #default>
					<el-tag v-if="menuDetail.isFull === true" size="small">是</el-tag>
					<el-tag v-else size="small" type="danger">否</el-tag>
				</template>
			</el-descriptions-item>
			<el-descriptions-item label="是否固定在 tabs nav">
				<template #default>
					<el-tag v-if="menuDetail.isAffix === true" size="small">是</el-tag>
					<el-tag v-else size="small" type="danger">否</el-tag>
				</template>
			</el-descriptions-item>
			<el-descriptions-item label="是否缓存">
				<template #default>
					<el-tag v-if="menuDetail.isKeepAlive === true" size="small">是</el-tag>
					<el-tag v-else size="small" type="danger">否</el-tag>
				</template>
			</el-descriptions-item>
			<el-descriptions-item label="排序">{{ menuDetail.sort }}</el-descriptions-item>
			<el-descriptions-item label="创建人">{{ menuDetail.creator }}</el-descriptions-item>
			<el-descriptions-item label="更新人">{{ menuDetail.updater }}</el-descriptions-item>
			<el-descriptions-item label="创建时间">{{ menuDetail.createTime }}</el-descriptions-item>
			<el-descriptions-item label="更新时间">{{ menuDetail.updateTime }}</el-descriptions-item>
		</el-descriptions>
		<template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleDetail = false">关闭</el-button>
      </span>
		</template>
	</el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, FormInstance } from 'element-plus'
import { Pointer, Search } from '@element-plus/icons-vue'
import { AddMenu, ChangeStatus, DeleteMenu, GetMenuDict, List, UpdateMenu } from '@/api/modules/auth/menu'
import { Menu } from '@/api/interface/auth/menu'

const menuList = ref([])
const menuDetail = ref({})
const loading = ref<boolean>(false)
const dialogVisibleDetail = ref<boolean>(false)
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
	/** 重定向地址 */
	redirect: undefined,
	/** 路由地址 */
	path: undefined,
	/** 菜单图标名称 */
	icon: undefined,
	/** 外链（如果有填地址） */
	isLink: '',
	/** 菜单显示状态：0->禁用；1->启用 */
	isHide: 0,
	/** 是否全屏：0->否；1->是 */
	isFull: 0,
	/** 是否固定在 tabs nav：0->否；1->是 */
	isAffix: 0,
	/** 是否缓存：0->否；1->是 */
	isKeepAlive: 1,
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
	/** 重定向地址 */
	redirect: undefined,
	/** 路由地址 */
	path: undefined,
	/** 菜单图标名称 */
	icon: undefined,
	/** 外链（如果有填地址） */
	isLink: '',
	/** 菜单显示状态：0->禁用；1->启用 */
	isHide: 0,
	/** 是否全屏：0->否；1->是 */
	isFull: 0,
	/** 是否固定在 tabs nav：0->否；1->是 */
	isAffix: 0,
	/** 是否缓存：0->否；1->是 */
	isKeepAlive: 1,
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
	data.isHide = data.isHide === 1
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
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
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
	updateMenuForm.redirect = val.redirect
	updateMenuForm.path = val.path
	updateMenuForm.icon = val.icon
	updateMenuForm.isLink = val.isLink
	updateMenuForm.isHide = val.isHide
	updateMenuForm.isFull = val.isFull === 1
	updateMenuForm.isAffix = val.isAffix === 1
	updateMenuForm.isKeepAlive = val.isKeepAlive === 1
	updateMenuForm.sort = val.sort
	changeValue.value = val.parentId
	await GetMenuDict().then((res: any) => {
		options.value = res.data
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
	updateMenuForm.redirect = ''
	updateMenuForm.path = undefined
	updateMenuForm.icon = undefined
	updateMenuForm.isLink = ''
	updateMenuForm.isHide = false
	updateMenuForm.isFull = false
	updateMenuForm.isAffix = false
	updateMenuForm.isKeepAlive = true
	updateMenuForm.sort = 1
	changeValue.value = undefined
	dialogVisibleUpdateMenu.value = false
}

/** 菜单更新提交 */
const submitUpdateMenuForm = async () => {
	updateMenuForm.parentId = changeValue.value
	updateMenuForm.isHide = updateMenuForm.isHide ? 1 : 0
	updateMenuForm.isFull = updateMenuForm.isFull ? 1 : 0
	updateMenuForm.isAffix = updateMenuForm.isAffix ? 1 : 0
	updateMenuForm.isKeepAlive = updateMenuForm.isKeepAlive ? 1 : 0
	await UpdateMenu(updateMenuForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
			handleUpdateMenuClose()
			getMenuList()
		}
	})
}

/** 删除菜单 */
const handleDelete = (data: number) => {
	DeleteMenu(data).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
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
		options.value = res.data
	})
	dialogVisibleAddMenu.value = true
}

/** 关闭新增菜单弹窗 */
const handleAddMenuClose = () => {
	addMenuForm.parentId = undefined
	addMenuForm.title = undefined
	addMenuForm.name = undefined
	addMenuForm.level = 0
	addMenuForm.component = undefined
	addMenuForm.redirect = ''
	addMenuForm.path = undefined
	addMenuForm.icon = undefined
	addMenuForm.isLink = ''
	addMenuForm.isHide = false
	addMenuForm.isFull = false
	addMenuForm.isAffix = false
	addMenuForm.isKeepAlive = true
	addMenuForm.sort = 1
	changeValue.value = undefined
	dialogVisibleAddMenu.value = false
}

/** 新增菜单提交 */
const submitAddMenuForm = async () => {
	addMenuForm.parentId = changeValue.value
	addMenuForm.isHide = addMenuForm.isHide ? 1 : 0
	addMenuForm.isFull = addMenuForm.isFull ? 1 : 0
	addMenuForm.isAffix = addMenuForm.isAffix ? 1 : 0
	addMenuForm.isKeepAlive = addMenuForm.isKeepAlive ? 1 : 0
	await AddMenu(addMenuForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
			handleAddMenuClose()
			getMenuList()
		}
	})
}

/** 重置按钮 */
const resetMenuForm = (formEl: FormInstance | undefined) => {
	changeValue.value = undefined
	formEl?.resetFields()
}

/** 详情 */
const handleClickDetail = (data: any) => {
	menuDetail.value = data
	dialogVisibleDetail.value = true
}

/** 菜单信息弹窗关闭处理 */
const handleDetailClose = () => {
	menuDetail.value = {}
	dialogVisibleDetail.value = false
}

getMenuList()
</script>
