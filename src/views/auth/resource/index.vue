<template>
	<div class="common-layout">
		<el-container style="height: 100%">
			<el-header style="margin-top: 12px">
				<el-card class="box-card">
					资源管理
					<el-input style="width: 20%" v-model="data.queryParam.queryKey" placeholder="请输入搜索项" :prefix-icon="Search" clearable />
					<el-button style="margin-left: 4px" type="primary" @click="handleSearchChange" :icon="Search">
						搜索
					</el-button>
					<el-button style="margin-left: 4px" type="primary" @click="handleAddResource" :icon="Pointer">
						新增资源
					</el-button>
				</el-card>
			</el-header>
			<el-main>
				<el-card class="box-card">
					<el-table v-loading="loading" border :data="resourceList" style="width: 100%">
						<el-table-column prop="name" label="资源名称" width="100" />
						<el-table-column prop="url" label="资源路径" width="100" />
						<el-table-column prop="description" label="资源描述" />
						<el-table-column prop="routeKey" label="路由分配 key" />
						<el-table-column prop="sort" label="排序" width="100"/>
						<el-table-column prop="createTime" label="创建时间" />
						<el-table-column prop="updateTime" label="更新时间" />
						<el-table-column fixed="right" label="操作" width="150">
							<template #default="scope">
								<el-button size="small" @click="handleUpdateResource(scope.row)">编辑</el-button>
								<el-popconfirm
									confirm-button-text="是的"
									cancel-button-text="点错了，抱歉"
									:icon="InfoFilled"
									icon-color="red"
									title="确定要删除吗?"
									@confirm="handleClickDelete(scope.row.id)"
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

	<!-- 新增资源弹窗 -->
	<el-dialog v-model="dialogAddResourceVisible" title="新增资源" width="30%" :before-close="handleAddResourceClose">
		<el-form :model="addResourceRuleForm" ref="formAddResourceRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="资源类别" prop="categoryId">
				<el-select v-model="addResourceRuleForm.categoryId" class="m-2" placeholder="请选择资源类别" size="large">
					<el-option
						v-for="item in resourceCategoryDicts"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="资源名称" prop="name">
				<el-input placeholder="请输入资源名称" v-model="addResourceRuleForm.name" />
			</el-form-item>
			<el-form-item label="资源路径" prop="url">
				<el-input placeholder="请输入资源路径" v-model="addResourceRuleForm.url" />
			</el-form-item>
			<el-form-item label="路由分配 key" prop="routeKey">
				<el-select v-model="addResourceRuleForm.routeKey" class="m-2" placeholder="请选择路由分配 key" size="large">
					<el-option
						v-for="item in dictList"
						:key="item"
						:label="item"
						:value="item"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input placeholder="请输入资源排序" v-model="addResourceRuleForm.sort" />
			</el-form-item>
			<el-form-item label="资源描述" prop="description">
				<el-input
					v-model="addResourceRuleForm.description"
					:rows="2"
					type="textarea"
					placeholder="请输入资源描述"
				/>
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitAddResourceForm">提交</el-button>
					<el-button type="warning" @click="resetResourceForm(formAddResourceRef)">重置</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>

	<!-- 更新资源弹窗 -->
	<el-dialog v-model="dialogUpdateResourceVisible" title="更新资源" width="30%" :before-close="handleUpdateResourceClose">
		<el-form :model="updateResourceRuleForm" ref="formUpdateResourceRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="资源类别" prop="categoryId">
				<el-select v-model="updateResourceRuleForm.categoryId" class="m-2" placeholder="请选择资源类别" size="large">
					<el-option
						v-for="item in resourceCategoryDicts"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="资源名称" prop="name">
				<el-input v-model="updateResourceRuleForm.name" />
			</el-form-item>
			<el-form-item label="资源路径" prop="url">
				<el-input v-model="updateResourceRuleForm.url" />
			</el-form-item>
			<el-form-item label="路由分配 key" prop="routeKey">
				<el-select v-model="updateResourceRuleForm.routeKey" class="m-2" placeholder="请选择路由分配 key" size="large">
					<el-option
						v-for="item in dictList"
						:key="item"
						:label="item"
						:value="item"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input v-model="updateResourceRuleForm.sort" />
			</el-form-item>
			<el-form-item label="资源描述" prop="description">
				<el-input
					v-model="updateResourceRuleForm.description"
					:rows="2"
					type="textarea"
				/>
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitUpdateResourceForm">提交</el-button>
					<el-button type="warning" @click="resetResourceForm(formUpdateResourceRef)">重置</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, FormInstance } from 'element-plus'
import { InfoFilled, Pointer, Search } from '@element-plus/icons-vue'
import { AddResource, DeleteResource, List, UpdateResource } from '@/api/modules/auth/resource'
import { GetResourceCategoryDict } from '@/api/modules/auth/resourceCategory'
import { GetKeyByDictGroup } from '@/api/modules/system/dict'
import { Resource } from '@/api/interface/auth/resource'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const resourceList = ref([])
const loading = ref<boolean>(false)
const dialogAddResourceVisible = ref(false)
const dialogUpdateResourceVisible = ref(false)
const dictList = ref([])

const formAddResourceRef = ref<FormInstance>()
const formUpdateResourceRef = ref<FormInstance>()

const resourceCategoryDicts = ref([{
	label: '',
	value: 0
}])

const data = reactive({
	form: {},
	queryParam: {
		pageNum: 1,
		pageSize: 10,
		queryKey: ''
	},
})

const addResourceRuleForm = reactive<Resource.AddResourceRequestData>({
	/** 资源名称 */
	name: '',
	/** 资源路径 */
	url: '',
	/** 资源描述 */
	description: '',
	/** 资源类别ID */
	categoryId: undefined,
	/** 路由分配 key */
	routeKey: '',
	/** 排序 */
	sort: 2
})

const updateResourceRuleForm = reactive<Resource.UpdateResourceRequestData>({
	/** 资源 id */
	resourceId: undefined,
	/** 资源名称 */
	name: '',
	/** 资源路径 */
	url: '',
	/** 资源描述 */
	description: '',
	/** 资源类别ID */
	categoryId: undefined,
	/** 路由分配 key */
	routeKey: '',
	/** 排序 */
	sort: 2
})

/** 获取资源列表 */
const getResourceList = () => {
	loading.value = true
	List(data.queryParam).then((res: any) => {
		loading.value = false
		resourceList.value = res.data.list
		total.value = res.data.total
	});
}

/** 获取资源 key 字典 */
const getKeyByDictGroup = () => {
	const queryKey = 'RESOURCE'
	GetKeyByDictGroup(queryKey).then((res: any) => {
		let data = res.data
		dictList.value = data.map((x: any) => x.key)
	})
}

/** 获取资源类别字典 */
const getResourceCategoryDict = () => {
	GetResourceCategoryDict().then((res: any) => {
		let data = res.data
		let resourceCategoryDict: { value: any; label: any }[]
		resourceCategoryDict = data.map((i: any) => ({
			value: i.resourceCategoryId,
			label: i.categoryName
		}))
		resourceCategoryDicts.value = resourceCategoryDict
	})
}

/** 页大小调整 */
const handleSizeChange = (val: number) => {
	data.queryParam.pageSize = val
	getResourceList()
}

/** 页码调整 */
const handleCurrentChange = (val: number) => {
	data.queryParam.pageNum = val
	getResourceList()
}

/** 搜索 */
const handleSearchChange = () => {
	getResourceList()
}

/** 资源删除 */
const handleClickDelete = (val: number) => {
	DeleteResource(val).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
		} else {
			ElNotification({
				title: '失败！',
				message: res.message,
				type: 'error',
			})
		}
		getResourceList()
	})
}

/** 重置表单 */
const resetResourceForm = (formEl: FormInstance | undefined) => {
	formEl?.resetFields()
}

/** 新增资源按钮 */
const handleAddResource = () => {
	dialogAddResourceVisible.value = true
}

/** 新增资源提交 */
const submitAddResourceForm = () => {
	AddResource(addResourceRuleForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
		}
		handleAddResourceClose()
		getResourceList()
	})
}

/** 新增资源弹窗关闭 */
const handleAddResourceClose = () => {
	formAddResourceRef.value?.resetFields()
	addResourceRuleForm.categoryId = undefined
	dialogAddResourceVisible.value = false
}

/** 更新资源按钮 */
const handleUpdateResource = (val: any) => {
	updateResourceRuleForm.resourceId = val.id
	updateResourceRuleForm.name = val.name
	updateResourceRuleForm.url = val.url
	updateResourceRuleForm.description = val.description
	updateResourceRuleForm.routeKey = val.routeKey
	updateResourceRuleForm.sort = val.sort
	updateResourceRuleForm.categoryId = val.categoryId
	dialogUpdateResourceVisible.value = true
}

/** 更新资源弹窗关闭 */
const handleUpdateResourceClose = () => {
	formUpdateResourceRef.value?.resetFields()
	dialogUpdateResourceVisible.value = false
}

/** 更新资源提交 */
const submitUpdateResourceForm = () => {
	UpdateResource(updateResourceRuleForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
		}
		handleUpdateResourceClose()
		getResourceList()
	})
}

getResourceList()
getResourceCategoryDict()
getKeyByDictGroup()
</script>
