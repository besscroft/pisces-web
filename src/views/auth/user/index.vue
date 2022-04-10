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
        <el-card class="box-card">
          <el-table v-loading="loading" border :data="userList" height="250" style="width: 100%;height: 650px">
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="avatar" label="头像" width="88">
              <template #default="scope">
                <el-image style="width: 66px; height: 66px" :src="scope.row.avatar" fit="fit" />
              </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="name" label="昵称"/>
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
            <el-table-column fixed="right" label="操作" width="168">
              <template #default="scope">
                <el-row :gutter="20">
                  <el-col :span="11">
                    <el-button type="primary" size="small" @click="handleRoleBanding(scope.row)">角色配置</el-button>
                  </el-col>
                  <el-col :span="11">
                    <el-button type="primary" size="small" @click="handleClickDetail(scope.row)">查看详情</el-button>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="11">
                    <el-button type="primary" size="small" @click="handleUpdateUser(scope.row)">编辑用户</el-button>
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
                        <el-button type="danger" size="small">删除用户</el-button>
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
        <el-input placeholder="请输入用户名" v-model="addUserRuleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input placeholder="请输入密码" v-model="addUserRuleForm.password" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input placeholder="请输入头像地址" v-model="addUserRuleForm.avatar" />
      </el-form-item>
      <el-form-item label="邮件" prop="email">
        <el-input placeholder="请输入邮件" v-model="addUserRuleForm.email" />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input placeholder="请输入昵称" v-model="addUserRuleForm.name" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input placeholder="请输入真实姓名" v-model="addUserRuleForm.realName" />
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input placeholder="请输入手机号" v-model="addUserRuleForm.telephone" />
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
        <el-input placeholder="请输入备注" v-model="addUserRuleForm.remark" type="textarea" />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitAddUserForm(addUserRuleFormRef)">提交</el-button>
            <el-button @click="resetForm(addUserRuleFormRef)">重置</el-button>
            <el-button @click="canalForm(addUserRuleFormRef)">关闭</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 修改用户弹窗 -->
  <el-dialog
    v-model="dialogVisibleUpdateUser"
    title="修改用户"
    width="36%"
    :before-close="handleUpdateUserClose"
  >
    <el-form
      :model="updateUserForm"
      ref="updateUserRuleFormRef"
      label-width="120px"
      class="demo-ruleForm"
    >
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
            <el-button type="primary" @click="submitUpdateUserForm">提交</el-button>
            <el-button @click="handleUpdateUserClose(updateUserRuleFormRef)">关闭</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 绑定角色弹窗 -->
  <el-dialog
    v-model="dialogVisibleUpdateRole"
    title="绑定角色"
    width="36%"
    :before-close="handleUpdateRoleClose"
  >
    <el-form
      :model="updateRoleForm"
      ref="updateRoleRuleFormRef"
      label-width="120px"
      class="demo-ruleForm"
    >
      到底应该单角色，还是支持多角色，应根据系统业务需求来定！这里保留多角色接口，需要时替换组件即可！
      <el-form-item label="选择角色" prop="roleIds">
        <el-select-v2
          v-model="value"
          :options="options"
          placeholder="Please select"
          size="large"
        />
      </el-form-item>
      <el-form-item>
          <span class="dialog-footer">
            <el-button @click="submitUpdateRoleForm">提交</el-button>
            <el-button type="primary" @click="handleUpdateRoleClose(updateUserRuleFormRef)">关闭</el-button>
          </span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { List, ChangeStatus, AddUser, UpdateUser, DeleteUser, UpdateUserRole } from '@/api/auth/user'
import { GetRoleDict } from '@/api/auth/role'
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
const userDetail = ref({})
const loading = ref<boolean>(false)
const dialogVisibleDetail = ref<boolean>(false)
const dialogVisibleAddUser = ref<boolean>(false)
const dialogVisibleUpdateUser = ref<boolean>(false)
const dialogVisibleUpdateRole = ref<boolean>(false)
const value = ref<Array<number>>()
const options = ref([{
  label: '',
  value: 0
}])

const addUserRuleFormRef = ref<FormInstance>()
const updateUserRuleFormRef = ref<FormInstance>()
const updateRoleRuleFormRef = ref<FormInstance>()

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  }
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
  /** 用户 id */
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

const updateRoleForm = reactive<UpdateUserRoleRequestData>({
  /** 用户 id */
  userId: 0,
  /** 角色 id 列表 */
  roleIds: []
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
  List(data.queryParam).then(res => {
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
  ChangeStatus(data).then(res => {
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
  DeleteUser(data).then(res => {
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
  userDetail.value = {}
  dialogVisibleDetail.value = false
}

/** 新增用户弹窗关闭处理 */
const handleAddUserClose = () => {
  addUserRuleFormRef.value.resetFields()
  dialogVisibleAddUser.value = false
}

/** 更新用户弹窗关闭处理 */
const handleUpdateUserClose = () => {
  updateUserRuleFormRef.value.resetFields()
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
      AddUser(addUserRuleForm).then(res => {
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
  await UpdateUser(updateUserForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        message: resData.message,
        type: 'success'
      })
      getUserList()
    } else {
      ElMessage({
        showClose: true,
        message: resData.message,
        type: 'success'
      })
    }
    handleUpdateUserClose()
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

/** 角色绑定弹窗 */
const handleRoleBanding = (val: any) => {
  updateRoleForm.userId = val.id
  GetRoleDict().then(res => {
    let data = res.data.data
    let roleDict: { value: any; label: any }[] = []
    for (const dataListKey in data) {
      let role = data[dataListKey]
      roleDict.push({
        value: `${role.roleId}`,
        label: `${role.roleName}`
      })
    }
    options.value = roleDict
  })
  dialogVisibleUpdateRole.value = true
  updateRoleForm.userId = val.id
}

/** 角色绑定提交 */
const submitUpdateRoleForm = async () => {
  let roleIds: Array<number> = []
  roleIds.push(value.value)
  updateRoleForm.roleIds = roleIds
  await UpdateUserRole(updateRoleForm).then(res => {
    let resData = res.data
    if (resData.code === 200) {
      ElMessage({
        showClose: true,
        message: resData.message,
        type: 'success'
      })
      getUserList()
    } else {
      ElMessage({
        showClose: true,
        message: resData.message,
        type: 'success'
      })
    }
    handleUpdateRoleClose()
  })
}

/** 角色绑定关闭 */
const handleUpdateRoleClose = () => {
  dialogVisibleUpdateRole.value = false
}

getUserList()
</script>
