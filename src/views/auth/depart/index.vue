<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          部门管理
          <el-input
            style="width: 20%"
            v-model="data.queryParam.queryKey"
            placeholder="请输入搜索项"
            :prefix-icon="Search"
            clearable />
          <el-button
            style="margin-left: 4px"
            type="primary"
            @click="handleSearchChange"
            :icon="Search">
            搜索
          </el-button>
          <el-button
            style="margin-left: 4px"
            type="primary"
            @click="handleAddDepart"
            :icon="Pointer">
            新增部门
          </el-button>
        </el-card>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-table
            v-loading="loading"
            row-key="id"
            border
            :data="departList"
            style="width: 100%"
            default-expand-all
          >
            <el-table-column prop="name" label="部门名称" width="200" />
            <el-table-column prop="description" label="部门描述" />
            <el-table-column prop="sort" label="排序" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="更新时间" />
            <el-table-column fixed="right" label="操作" width="150">
              <template #default="scope">
                <el-button size="small" @click="handleUpdateDepart(scope.row)">编辑</el-button>
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

  <!-- 新增部门弹窗 -->
  <el-dialog
    v-model="dialogAddDepartVisible"
    title="新增部门"
    width="30%"
    :before-close="handleAddDepartClose"
  >
    <el-form
      :model="addDepartRuleForm"
      ref="formAddDepartRef"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="父级部门名称" prop="categoryId">
        <el-select v-model="addDepartRuleForm.parentId" class="m-2" placeholder="请选择父级部门名称" size="large">
          <el-option
            v-for="item in departDicts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="请输入部门名称" v-model="addDepartRuleForm.name" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input placeholder="请输入部门排序" v-model="addDepartRuleForm.sort" />
      </el-form-item>
      <el-form-item label="部门描述" prop="description">
        <el-input
          v-model="addDepartRuleForm.description"
          :rows="2"
          type="textarea"
          placeholder="请输入部门描述"
        />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitAddDepartForm">提交</el-button>
            <el-button type="warning" @click="resetDepartForm(formAddDepartRef)">重置</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 修改部门弹窗 -->
  <el-dialog
    v-model="dialogUpdateDepartVisible"
    title="修改部门"
    width="30%"
    :before-close="handleUpdateDepartClose"
  >
    <el-form
      :model="updateDepartRuleForm"
      ref="formUpdateDepartRef"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="父级部门名称" prop="categoryId">
        <el-select v-model="updateDepartRuleForm.parentId" class="m-2" placeholder="请选择父级部门名称" size="large">
          <el-option
            v-for="item in departDicts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="updateDepartRuleForm.name" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="updateDepartRuleForm.sort" />
      </el-form-item>
      <el-form-item label="部门描述" prop="description">
        <el-input
          v-model="updateDepartRuleForm.description"
          :rows="2"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitUpdateDepartForm">提交</el-button>
            <el-button type="warning" @click="resetDepartForm(formUpdateDepartRef)">重置</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Search, InfoFilled, Pointer } from '@element-plus/icons-vue'
import { List, DeleteDepart, AddDepart, UpdateDepart, GetDepartDict } from '@/api/auth/depart'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const departList = ref([])
const loading = ref<boolean>(false)
const dialogAddDepartVisible = ref(false)
const dialogUpdateDepartVisible = ref(false)
const departDicts = ref([])

const formAddDepartRef = ref<FormInstance>()
const formUpdateDepartRef = ref<FormInstance>()

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  },
})

const addDepartRuleForm = reactive<AddDepartRequestData>({
  /** 上级 id */
  parentId: undefined,
  /** 部门名称 */
  name: '',
  /** 部门描述 */
  description: '',
  /** 排序 */
  sort: 2
})

const updateDepartRuleForm = reactive<UpdateDepartRequestData>({
  /** 部门 id */
  departId: undefined,
  /** 上级 id */
  parentId: undefined,
  /** 部门名称 */
  name: '',
  /** 部门描述 */
  description: '',
  /** 排序 */
  sort: 2
})

/** 获取部门列表 */
const getDepartList = () => {
  loading.value = true
  List(data.queryParam).then(res => {
    loading.value = false
    let resData = res.data
    let dataList = resData.data.list
    departList.value = dataList
    total.value = resData.data.total
  });
}

/** 获取部门字典 */
const getDepartDict = () => {
  GetDepartDict().then(res => {
    let resData = res.data
    let data = resData.data
    let departDict: { value: any; label: any }[]
    departDict = data.map((i: any) => ({
      value: i.departId,
      label: i.departName
    }))
    departDicts.value = departDict
  })
}

/** 页大小调整 */
const handleSizeChange = (val: number) => {
  data.queryParam.pageSize = val
  getDepartList()
}

/** 页码调整 */
const handleCurrentChange = (val: number) => {
  data.queryParam.pageNum = val
  getDepartList()
}

/** 搜索 */
const handleSearchChange = () => {
  getDepartList()
}

/** 部门删除 */
const handleClickDelete = (val: number) => {
  DeleteDepart(val).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
    } else {
      ElMessage({
        showClose: true,
        type: 'error',
        message: resData.message
      })
    }
    getDepartList()
  })
}

/** 重置表单 */
const resetDepartForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
}

/** 新增部门按钮 */
const handleAddDepart = () => {
  addDepartRuleForm.parentId = undefined
  dialogAddDepartVisible.value = true
}

/** 新增部门提交 */
const submitAddDepartForm = () => {
  AddDepart(addDepartRuleForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
    }
    handleAddDepartClose()
    getDepartList()
  })
}

/** 新增部门弹窗关闭 */
const handleAddDepartClose = () => {
  formAddDepartRef.value?.resetFields()
  addDepartRuleForm.parentId = undefined
  dialogAddDepartVisible.value = false
}

/** 更新部门按钮 */
const handleUpdateDepart = (val: any) => {
  updateDepartRuleForm.departId = val.id
  updateDepartRuleForm.parentId = val.parentId
  updateDepartRuleForm.name = val.name
  updateDepartRuleForm.description = val.description
  updateDepartRuleForm.sort = val.sort
  dialogUpdateDepartVisible.value = true
}

/** 更新部门弹窗关闭 */
const handleUpdateDepartClose = () => {
  formUpdateDepartRef.value?.resetFields()
  dialogUpdateDepartVisible.value = false
}

/** 更新部门提交 */
const submitUpdateDepartForm = () => {
  UpdateDepart(updateDepartRuleForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
    }
    handleUpdateDepartClose()
    getDepartList()
  })
}

getDepartList()
getDepartDict()
</script>
