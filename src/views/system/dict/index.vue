<template>
	<div class="common-layout">
		<el-container style="height: 100%">
			<el-header style="margin-top: 12px">
				<el-card class="box-card">
					字典管理
					<el-input style="width: 20%" v-model="data.queryParam.queryKey" placeholder="请输入搜索项" :prefix-icon="Search" clearable />
					<el-button style="margin-left: 4px" type="primary" @click="handleSearchChange" :icon="Search">
						搜索
					</el-button>
					<el-button style="margin-left: 4px" type="primary" @click="handleAddDict" :icon="Pointer">
						新增字典
					</el-button>
				</el-card>
			</el-header>
			<el-main>
				<el-card class="box-card">
					<el-table :data="dictList" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
						<el-table-column prop="groupName" label="字典分组" width="180" />
						<el-table-column prop="key" label="字典 key" width="180" />
						<el-table-column prop="value" label="字典值" width="180" />
						<el-table-column prop="remark" label="备注" />
						<el-table-column prop="createTime" label="创建时间" sortable width="180" />
						<el-table-column prop="updateTime" label="更新时间" sortable width="180" />
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

	<!-- 新增字典弹窗 -->
	<el-dialog v-model="dialogAddDictVisible" title="新增字典" width="30%" :before-close="handleAddDictClose">
		<el-form :model="addDictRuleForm" ref="formAddDictRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="字典分组名称" prop="groupName">
				<el-input placeholder="请输入字典分组名称" v-model="addDictRuleForm.groupName" />
			</el-form-item>
			<el-form-item label="字典 key" prop="key">
				<el-input placeholder="请输入字典 key" v-model="addDictRuleForm.key" />
			</el-form-item>
			<el-form-item label="字典值" prop="value">
				<el-input placeholder="字典值" v-model="addDictRuleForm.value" />
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="addDictRuleForm.remark" :rows="2" type="textarea" placeholder="请输入备注" />
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitAddDictForm">提交</el-button>
					<el-button type="warning" @click="resetDictForm(formAddDictRef)">重置</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>

	<!-- 更新字典弹窗 -->
	<el-dialog v-model="dialogUpdateDictVisible" title="更新字典" width="30%" :before-close="handleUpdateDictClose">
		<el-form :model="updateDictRuleForm" ref="formUpdateDictRef" label-width="120px" class="demo-ruleForm">
			<el-form-item label="字典分组名称" prop="groupName">
				<el-input v-model="updateDictRuleForm.groupName" />
			</el-form-item>
			<el-form-item label="字典 key" prop="key">
				<el-input v-model="updateDictRuleForm.key" />
			</el-form-item>
			<el-form-item label="字典值" prop="value">
				<el-input placeholder="字典值" v-model="updateDictRuleForm.value" />
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="updateDictRuleForm.remark" :rows="2" type="textarea" />
			</el-form-item>
			<el-form-item>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitUpdateDictForm">提交</el-button>
					<el-button type="warning" @click="resetDictForm(formUpdateDictRef)">重置</el-button>
				</span>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { AddDict, DeleteDict, List, UpdateDict } from '@/api/modules/system/dict'
import { ElNotification, FormInstance } from 'element-plus'
import { Pointer, Search } from '@element-plus/icons-vue'
import { Dict } from '@/api/interface/system/dict'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const dictList = ref([])
const loading = ref<boolean>(false)
const dialogAddDictVisible = ref(false)
const dialogUpdateDictVisible = ref(false)

const formAddDictRef = ref<FormInstance>()
const formUpdateDictRef = ref<FormInstance>()

const data = reactive({
	form: {},
	queryParam: {
		pageNum: 1,
		pageSize: 10,
		queryKey: ''
	}
})

const addDictRuleForm = reactive<Dict.AddDictRequestData>({
	/** 字典分组名称 */
	groupName: '',
	/** 字典 key */
	key: '',
	/** 字典值 */
	value: '',
	/** 备注 */
	remark: ''
})

const updateDictRuleForm = reactive<Dict.UpdateDictRequestData>({
	id: undefined,
	/** 字典分组名称 */
	groupName: '',
	/** 字典 key */
	key: '',
	/** 字典值 */
	value: '',
	/** 备注 */
	remark: ''
})

/** 获取菜单列表 */
const getDictList = () => {
	loading.value = true
	List(data.queryParam).then((res: any) => {
		loading.value = false
		dictList.value = res.data.list
		total.value = res.data.total
	})
}

/** 页大小调整 */
const handleSizeChange = (val: number) => {
	data.queryParam.pageSize = val
	getDictList()
}

/** 页码调整 */
const handleCurrentChange = (val: number) => {
	data.queryParam.pageNum = val
	getDictList()
}

/** 字典更新 */
const handleEdit = (val: any) => {
	updateDictRuleForm.id = val.id
	updateDictRuleForm.groupName = val.groupName
	updateDictRuleForm.key = val.key
	updateDictRuleForm.value = val.value
	updateDictRuleForm.remark = val.remark
	dialogUpdateDictVisible.value = true
}

/** 字典删除 */
const handleDelete = (val: number) => {
	DeleteDict(val).then((res: any) => {
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
		getDictList()
	})
}

/** 搜索 */
const handleSearchChange = () => {
	getDictList()
}

/** 重置表单 */
const resetDictForm = (formEl: FormInstance | undefined) => {
	formEl?.resetFields()
}

/** 新增资源按钮 */
const handleAddDict = () => {
	dialogAddDictVisible.value = true
}

/** 新增字典弹窗关闭 */
const handleAddDictClose = () => {
	formAddDictRef.value?.resetFields()
	dialogAddDictVisible.value = false
}

/** 更新字典弹窗关闭 */
const handleUpdateDictClose = () => {
	formUpdateDictRef.value?.resetFields()
	dialogUpdateDictVisible.value = false
}

/** 新增字典提交 */
const submitAddDictForm = () => {
	AddDict(addDictRuleForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
		}
		handleAddDictClose()
		getDictList()
	})
}

/** 更新字典提交 */
const submitUpdateDictForm = () => {
	UpdateDict(updateDictRuleForm).then((res: any) => {
		if (res.code === 200) {
			ElNotification({
				title: '成功！',
				message: res.message,
				type: 'success',
			})
		}
		handleUpdateDictClose()
		getDictList()
	})
}

getDictList()
</script>
