<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          白名单管理
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
            @click="handleAddWhite"
            :icon="Pointer">
            新增白名单
          </el-button>
        </el-card>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-table
            v-loading="loading"
            row-key="id"
            border
            :data="whiteList"
            style="width: 100%"
            default-expand-all
          >
            <el-table-column prop="title" label="白名单规则名称" width="200" />
            <el-table-column prop="path" label="白名单规则地址" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="更新时间" />
            <el-table-column fixed="right" label="操作" width="150">
              <template #default="scope">
                <el-button size="small" @click="handleUpdateWhite(scope.row)">编辑</el-button>
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

  <!-- 新增白名单弹窗 -->
  <el-dialog
    v-model="dialogAddWhiteVisible"
    title="新增白名单"
    width="30%"
    :before-close="handleAddWhiteClose"
  >
    <el-form
      :model="addWhiteRuleForm"
      ref="formAddWhiteRef"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="白名单规则名称" prop="title">
        <el-input placeholder="请输入白名单规则名称" v-model="addWhiteRuleForm.title" />
      </el-form-item>
      <el-form-item label="白名单规则地址" prop="path">
        <el-input placeholder="请输入白名单规则地址" v-model="addWhiteRuleForm.path" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="addWhiteRuleForm.remark"
          :rows="2"
          type="textarea"
          placeholder="请输入备注"
        />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitAddWhiteForm">提交</el-button>
            <el-button type="warning" @click="resetDepartForm(formAddWhiteRef)">重置</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 修改白名单弹窗 -->
  <el-dialog
    v-model="dialogUpdateWhiteVisible"
    title="修改白名单"
    width="30%"
    :before-close="handleUpdateWhiteClose"
  >
    <el-form
      :model="updateWhiteRuleForm"
      ref="formUpdateWhiteRef"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="白名单规则名称" prop="title">
        <el-input v-model="updateWhiteRuleForm.title" />
      </el-form-item>
      <el-form-item label="白名单规则地址" prop="path">
        <el-input v-model="updateWhiteRuleForm.path" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="updateWhiteRuleForm.remark"
          :rows="2"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitUpdateWhiteForm">提交</el-button>
            <el-button type="warning" @click="resetDepartForm(formUpdateWhiteRef)">重置</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { Search, InfoFilled, Pointer } from '@element-plus/icons-vue'
import { List, AddWhite, UpdateWhite, DeleteWhite } from '@/api/system/white'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const whiteList = ref([])
const loading = ref<boolean>(false)
const dialogAddWhiteVisible = ref(false)
const dialogUpdateWhiteVisible = ref(false)

const formAddWhiteRef = ref<FormInstance>()
const formUpdateWhiteRef = ref<FormInstance>()

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  },
})

const addWhiteRuleForm = reactive<AddWhiteRequestData>({
  /** 白名单规则名称 */
  title: '',
  /** 白名单规则地址 */
  path: '',
  /** 备注 */
  remark: ''
})

const updateWhiteRuleForm = reactive<UpdateWhiteRequestData>({
  /** 白名单 id */
  whiteId: undefined,
  /** 白名单规则名称 */
  title: '',
  /** 白名单规则地址 */
  path: '',
  /** 备注 */
  remark: ''
})

/** 获取部门列表 */
const getWhiteList = () => {
  loading.value = true
  List(data.queryParam).then(res => {
    loading.value = false
    let resData = res.data
    let dataList = resData.data.list
    whiteList.value = dataList
    total.value = resData.data.total
  });
}

/** 页大小调整 */
const handleSizeChange = (val: number) => {
  data.queryParam.pageSize = val
  getWhiteList()
}

/** 页码调整 */
const handleCurrentChange = (val: number) => {
  data.queryParam.pageNum = val
  getWhiteList()
}

/** 搜索 */
const handleSearchChange = () => {
  getWhiteList()
}

/** 白名单删除 */
const handleClickDelete = (val: number) => {
  DeleteWhite(val).then(res => {
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
    getWhiteList()
  })
}

/** 重置表单 */
const resetDepartForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
}

/** 新增白名单按钮 */
const handleAddWhite = () => {
  dialogAddWhiteVisible.value = true
}

/** 新增白名单弹窗关闭 */
const handleAddWhiteClose = () => {
  formAddWhiteRef.value?.resetFields()
  dialogAddWhiteVisible.value = false
}

/** 新增白名单提交 */
const submitAddWhiteForm = () => {
  AddWhite(addWhiteRuleForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
      handleAddWhiteClose()
      getWhiteList()
    }
  })
}

/** 更新白名单按钮 */
const handleUpdateWhite = (val: any) => {
  updateWhiteRuleForm.whiteId = val.id
  updateWhiteRuleForm.title = val.title
  updateWhiteRuleForm.path = val.path
  updateWhiteRuleForm.remark = val.remark
  dialogUpdateWhiteVisible.value = true
}

/** 更新白名单弹窗关闭 */
const handleUpdateWhiteClose = () => {
  formUpdateWhiteRef.value?.resetFields()
  dialogUpdateWhiteVisible.value = false
}

/** 更新白名单提交 */
const submitUpdateWhiteForm = () => {
  UpdateWhite(updateWhiteRuleForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
      handleUpdateWhiteClose()
    }
    getWhiteList()
  })
}

getWhiteList()
</script>
