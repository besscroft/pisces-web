<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          资源类别管理
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
            @click="handleAddResourceCategory"
            :icon="Pointer">
            新增资源类别
          </el-button>
        </el-card>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-table v-loading="loading" border :data="resourceCategoryList" height="250" style="width: 100%;height: 650px">
            <el-table-column prop="categoryName" label="资源类别名称" width="100" />
            <el-table-column prop="description" label="资源描述" />
            <el-table-column prop="sort" label="排序" width="100"/>
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="更新时间" />
            <el-table-column fixed="right" label="操作" width="150">
              <template #default="scope">
                <el-button size="small" @click="handleUpdateResourceCategory(scope.row)">编辑</el-button>
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

  <!-- 新增资源类别弹窗 -->
  <el-dialog
    v-model="dialogAddResourceCategoryVisible"
    title="新增资源类别"
    width="30%"
    :before-close="handleAddResourceCategoryClose"
  >
    <el-form
      :model="addResourceCategoryRuleForm"
      ref="formAddResourceCategoryRef"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="资源类别名称" prop="name">
        <el-input placeholder="请输入资源名称" v-model="addResourceCategoryRuleForm.categoryName" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input placeholder="请输入资源排序" v-model="addResourceCategoryRuleForm.sort" />
      </el-form-item>
      <el-form-item label="资源类别描述" prop="description">
        <el-input
          v-model="addResourceCategoryRuleForm.description"
          :rows="2"
          type="textarea"
          placeholder="请输入资源类别描述"
        />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitAddResourceCategoryForm">提交</el-button>
            <el-button type="warning" @click="resetResourceCategoryForm(formAddResourceCategoryRef)">重置</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 更新资源类别弹窗 -->
  <el-dialog
    v-model="dialogUpdateResourceCategoryVisible"
    title="新增资源类别"
    width="30%"
    :before-close="handleUpdateResourceCategoryClose"
  >
    <el-form
      :model="updateResourceCategoryRuleForm"
      ref="formUpdateResourceCategoryRef"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="资源类别名称" prop="name">
        <el-input v-model="updateResourceCategoryRuleForm.categoryName" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="updateResourceCategoryRuleForm.sort" />
      </el-form-item>
      <el-form-item label="资源类别描述" prop="description">
        <el-input
          v-model="updateResourceCategoryRuleForm.description"
          :rows="2"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitUpdateResourceCategoryForm">提交</el-button>
            <el-button type="warning" @click="resetResourceCategoryForm(formUpdateResourceCategoryRef)">重置</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, InfoFilled, Pointer } from '@element-plus/icons-vue'
import { List, DeleteResourceCategory, AddResourceCategory, UpdateResourceCategory } from '@/api/auth/resourceCategory'
import { FormInstance } from 'element-plus/es'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const resourceCategoryList = ref([])
const loading = ref<boolean>(false)
const dialogAddResourceCategoryVisible = ref(false)
const dialogUpdateResourceCategoryVisible = ref(false)

const formAddResourceCategoryRef = ref<FormInstance>()
const formUpdateResourceCategoryRef = ref<FormInstance>()

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  },
})

const addResourceCategoryRuleForm = reactive<AddResourceCategoryRequestData>({
  /** 资源类别名称 */
  categoryName: '',
  /** 资源类别描述 */
  description: '',
  /** 排序 */
  sort: 0
})

const updateResourceCategoryRuleForm = reactive<UpdateResourceCategoryRequestData>({
  /** 资源类别 id */
  resourceCategoryId: undefined,
  /** 资源类别名称 */
  categoryName: '',
  /** 资源类别描述 */
  description: '',
  /** 排序 */
  sort: 0
})

/** 获取资源类别列表 */
const getResourceCategoryList = () => {
  loading.value = true
  List(data.queryParam).then(res => {
    loading.value = false
    let resData = res.data
    let dataList = resData.data.list
    resourceCategoryList.value = dataList
    total.value = resData.data.total
  });
}

/** 页大小调整 */
const handleSizeChange = (val: number) => {
  data.queryParam.pageSize = val
  getResourceCategoryList()
}

/** 页码调整 */
const handleCurrentChange = (val: number) => {
  data.queryParam.pageNum = val
  getResourceCategoryList()
}

/** 搜索 */
const handleSearchChange = () => {
  getResourceCategoryList()
}

/** 资源类别删除 */
const handleClickDelete = (val: number) => {
  DeleteResourceCategory(val).then(res => {
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
    getResourceCategoryList()
  })
}

/** 重置表单 */
const resetResourceCategoryForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
}

/** 新增资源类别按钮 */
const handleAddResourceCategory = () => {
  dialogAddResourceCategoryVisible.value = true
}

/** 新增资源类别关闭按钮 */
const handleAddResourceCategoryClose = () => {
  formAddResourceCategoryRef.value?.resetFields()
  dialogAddResourceCategoryVisible.value = false
}

/** 新增资源类别提交 */
const submitAddResourceCategoryForm = () => {
  AddResourceCategory(addResourceCategoryRuleForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
      handleAddResourceCategoryClose()
      getResourceCategoryList()
    }
  })
}

/** 更新资源类别按钮 */
const handleUpdateResourceCategory = (val: any) => {
  updateResourceCategoryRuleForm.resourceCategoryId = val.id
  updateResourceCategoryRuleForm.categoryName = val.categoryName
  updateResourceCategoryRuleForm.description = val.description
  updateResourceCategoryRuleForm.sort = val.sort
  dialogUpdateResourceCategoryVisible.value = true
}

/** 更新资源类别关闭按钮 */
const handleUpdateResourceCategoryClose = () => {
  formUpdateResourceCategoryRef.value?.resetFields()
  dialogUpdateResourceCategoryVisible.value = false
}

/** 更新资源类别提交 */
const submitUpdateResourceCategoryForm = () => {
  UpdateResourceCategory(updateResourceCategoryRuleForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
      handleUpdateResourceCategoryClose()
      getResourceCategoryList()
    }
  })

}
getResourceCategoryList()
</script>
