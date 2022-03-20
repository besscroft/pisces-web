<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          用户管理
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
            @click="handleAddUser"
            :icon="Avatar">
            新增用户
          </el-button>
        </el-card>
      </el-header>
      <el-main>
        <el-table v-loading="loading" border :data="userList" height="250" style="width: 100%;height: 650px">
          <el-table-column prop="username" label="用户名" width="150" />
          <el-table-column prop="avatar" label="头像" width="150">
            <template #default="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.avatar" fit="fit" />
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="name" label="昵称" />
          <el-table-column prop="telephone" label="手机" />
          <el-table-column prop="birthday" label="生日" />
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
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button type="primary" circle :icon="InfoFilled" size="small" @click="handleClickDetail(scope.row)"/>
              <el-button type="primary" circle :icon="Edit" size="small" @click="handleUpdateUser(scope.row)"/>
              <el-popconfirm
                confirm-button-text="是的"
                cancel-button-text="点错了，抱歉"
                :icon="InfoFilled"
                icon-color="red"
                title="确定要删除吗?"
                @confirm="handleClickDelete(scope.row.id)"
              >
                <template #reference>
                  <el-button type="danger" circle :icon="Delete" size="small"/>
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
      </el-main>
    </el-container>
  </div>

  <!-- 用户信息弹出框 -->
  <el-dialog
    v-model="dialogVisibleDetail"
    title="用户信息"
    width="50%"
    :before-close="handleDetailClose"
  >
    <el-descriptions
      title="用户详细信息展示"
      :column="4"
      border="true"
      direction="vertical"
    >
      <el-descriptions-item label="用户id">{{ userDetail.id }}</el-descriptions-item>
      <el-descriptions-item label="用户名">{{ userDetail.username }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userDetail.email }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ userDetail.name }}</el-descriptions-item>
      <el-descriptions-item label="真实姓名">{{ userDetail.realName }}</el-descriptions-item>
      <el-descriptions-item label="手机">{{ userDetail.telephone }}</el-descriptions-item>
      <el-descriptions-item label="生日">{{ userDetail.birthday }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        <template #default="scope">
          <el-tag v-if="userDetail.sex === 1" size="small">男</el-tag>
          <el-tag v-else size="small">女</el-tag>
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="创建者">{{ userDetail.creator }}</el-descriptions-item>
      <el-descriptions-item label="更新者">{{ userDetail.updater }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ userDetail.createTime }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{ userDetail.updateTime }}</el-descriptions-item>
      <el-descriptions-item label="帐号启用状态">
        <template #default="scope">
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
  <el-dialog
    v-model="dialogVisibleAddUser"
    title="新增用户"
    width="36%"
    :before-close="handleAddUserClose"
  >
    <el-form
      ref="addUserRuleFormRef"
      :model="addUserRuleForm"
      :rules="addUserRules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="addUserRuleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input v-model="addUserRuleForm.password" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="addUserRuleForm.avatar" />
      </el-form-item>
      <el-form-item label="邮件" prop="email">
        <el-input v-model="addUserRuleForm.email" />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="addUserRuleForm.name" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="addUserRuleForm.realName" />
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="addUserRuleForm.telephone" />
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
        <el-input v-model="addUserRuleForm.remark" type="textarea" />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button @click="submitAddUserForm(addUserRuleFormRef)">提交</el-button>
            <el-button type="primary" @click="resetForm(addUserRuleFormRef)">重置</el-button>
            <el-button type="primary" @click="canalForm(addUserRuleFormRef)">关闭</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 修改用户弹窗 -->
  <el-dialog
    v-model="dialogVisibleUpdateUser"
    title="新增用户"
    width="36%"
    :before-close="handleUpdateUserClose"
  >
    <el-form
      :model="updateUserForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="密码" prop="password">
        <el-input v-model="updateUserForm.password" />
      </el-form-item>
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
            <el-button @click="submitUpdateUserForm">提交</el-button>
            <el-button type="primary" @click="handleUpdateUserClose">关闭</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { list, changeStatus, addUser, updateUser, deleteUser } from '@/api/auth/user'
import { Search, Avatar, Delete, InfoFilled, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const userList = ref([])
const userDetail = ref()
const loading = ref<boolean>(false)
const dialogVisibleDetail = ref<boolean>(false)
const dialogVisibleAddUser = ref<boolean>(false)
const dialogVisibleUpdateUser = ref<boolean>(false)

const addUserRuleFormRef = ref<FormInstance>()

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  },
})

const addUserRuleForm = reactive<AddUserRequestData>({
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

const updateUserForm = reactive<UpdateUserRequestData>({
  /** 用户id */
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

/** 获取用户列表 */
const getUserList = () => {
  loading.value = true
  list(data.queryParam).then(res => {
    loading.value = false
    let resData = res.data
    let dataList = resData.data.list
    for (const dataListKey in dataList) {
      let data = dataList[dataListKey]
      if (data.status === 1) {
        data.status = true
      } else {
        data.status = false
      }
    }
    userList.value = dataList
    total.value = resData.data.total
  });
}

/** 更改用户可用状态 */
const changeStatusFetch = (data: ChangeUserStatusRequestData) => {
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
const handleSearchChange = () => {
  getUserList()
}

/** 详情 */
const handleClickDetail = (data: any) => {
  userDetail.value = data
  dialogVisibleDetail.value = true
}

/** 删除用户 */
const handleClickDelete = (data: number) => {
  console.log(data)
  deleteUser(data).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        type: 'success',
        message: resData.message
      })
      getUserList()
    }
  })
}

/** 是否启用变更 */
const handleChangeStatus = (val: any) => {
  const data : ChangeUserStatusRequestData = {
    userId: val.id,
    status: val.status
  }
  changeStatusFetch(data)
}

/** 用户信息弹窗关闭处理 */
const handleDetailClose = () => {
  userDetail.value = null
}

/** 新增用户弹窗关闭处理 */
const handleAddUserClose = () => {
  addUserRuleFormRef.value.resetFields()
  dialogVisibleAddUser.value = false
}

/** 更新用户弹窗关闭处理 */
const handleUpdateUserClose = () => {
  updateUserForm.id = 0
  updateUserForm.avatar = undefined
  updateUserForm.email = undefined
  updateUserForm.name = undefined
  updateUserForm.realName = undefined
  updateUserForm.telephone = undefined
  updateUserForm.birthday = undefined
  updateUserForm.sex = undefined
  updateUserForm.remark = undefined
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
      addUser(addUserRuleForm).then(res => {
        let resData = res.data
        if (resData.code === 200) {
          ElMessage({
            showClose: true,
            message: resData.message,
            type: 'success'
          })
          formEl.resetFields()
          dialogVisibleAddUser.value = false
          getUserList()
        } else {
          ElMessage({
            showClose: true,
            message: resData.message,
            type: 'success'
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
  console.log(updateUserForm)
  await updateUser(updateUserForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        message: resData.message,
        type: 'success'
      })
      handleUpdateUserClose()
      getUserList()
    } else {
      ElMessage({
        showClose: true,
        message: resData.message,
        type: 'success'
      })
    }
  })
}

/** 重置表单 */
const resetForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields()
  formEl.clearValidate()
}

/** 关闭表单 */
const canalForm = (formEl: FormInstance | undefined) => {
  formEl.resetFields()
  formEl.clearValidate()
  dialogVisibleAddUser.value = false
  dialogVisibleUpdateUser.value = false
}

getUserList()
</script>
