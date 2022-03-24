<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          菜单管理
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
        </el-card>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-table
            :data="menuList"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            default-expand-all
          >
            <el-table-column prop="title" label="菜单名称" width="180" />
            <el-table-column prop="name" label="前端名称" width="180" />
            <el-table-column prop="path" label="路由地址" width="180" />
            <el-table-column prop="component" label="组件路径"/>
            <el-table-column prop="createTime" label="创建时间" sortable width="180" />
            <el-table-column prop="updateTime" label="更新时间" sortable width="180" />
            <el-table-column prop="hidden" label="菜单显示状态" width="100">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.hidden"
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

  <!-- 修改菜单弹窗 -->
  <el-dialog
    v-model="dialogVisibleUpdateMenu"
    title="修改用户"
    width="36%"
    :before-close="handleUpdateMenuClose"
  >
    <el-form
      :model="updateMenuForm"
      label-width="120px"
      class="demo-ruleForm"
    >
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
            <el-button @click="submitUpdateMenuForm">提交</el-button>
            <el-button type="primary" @click="handleUpdateMenuClose">关闭</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { list, changeStatus, deleteMenu, updateMenu } from '@/api/auth/menu'

const background = ref(false)
const menuList = ref([])
const loading = ref<boolean>(false)
const dialogVisibleUpdateMenu = ref<boolean>(false)

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  },
})

const updateMenuForm = reactive<UpdateMenuRequestData>({
  /** 菜单id */
  id: 0,
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
  list(data.queryParam).then(res => {
    loading.value = false
    let resData = res.data
    let dataList = resData.data.list
    for (const dataListKey in dataList) {
      let data = dataList[dataListKey]
      menuHiddenHandle(data)
    }
    menuList.value = dataList
  });
}

/** 菜单递归处理 */
const menuHiddenHandle = (data: any) => {
  if (data.hidden === 1) {
    data.hidden = true
  } else {
    data.hidden = false
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
  const data : ChangeMenuStatusRequestData = {
    menuId: val.id,
    hidden: val.hidden
  }
  changeStatusFetch(data)
}

/** 更改菜单可用状态 */
const changeStatusFetch = (data: ChangeMenuStatusRequestData) => {
  changeStatus(data).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
    }
  })
}

/** 编辑按钮 */
const handleEdit = (val: any) => {
  updateMenuForm.id = val.id
  updateMenuForm.title = val.title
  updateMenuForm.name = val.name
  updateMenuForm.level = val.level
  updateMenuForm.component = val.component
  updateMenuForm.path = val.path
  updateMenuForm.icon = val.icon
  updateMenuForm.sort = val.sort
  dialogVisibleUpdateMenu.value = true
}

/** 更新菜单弹窗关闭处理 */
const handleUpdateMenuClose = () => {
  updateMenuForm.id = 0
  updateMenuForm.title = undefined
  updateMenuForm.name = undefined
  updateMenuForm.level = 0
  updateMenuForm.component = undefined
  updateMenuForm.path = undefined
  updateMenuForm.icon = undefined
  updateMenuForm.sort = 1
  dialogVisibleUpdateMenu.value = false
}

/** 菜单更新提交 */
const submitUpdateMenuForm = async () => {
  console.log(updateMenuForm)
  await updateMenu(updateMenuForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        message: resData.message,
        type: 'success'
      })
      handleUpdateMenuClose()
      getMenuList()
    } else {
      ElMessage({
        showClose: true,
        message: resData.message,
        type: 'success'
      })
    }
  })
}

/** 删除菜单 */
const handleDelete = (data: number) => {
  console.log(data)
  deleteMenu(data).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
      getMenuList()
    }
  })
}

/** 搜索 */
const handleSearchChange = () => {
  getMenuList()
}

getMenuList()
</script>
