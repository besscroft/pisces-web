<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          角色管理
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
        <el-table v-loading="loading" border :data="roleList" height="250" style="width: 100%;height: 650px">
          <el-table-column prop="roleName" label="角色名称" />
          <el-table-column prop="roleCode" label="角色编码" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="status" label="角色启用状态">
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
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button type="primary" circle :icon="InfoFilled" size="small" @click="handleClickDetail(scope.row)"/>
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
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Search, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { list } from '@/api/auth/role'
import { changeStatus } from '@/api/auth/role'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const roleList = ref([])
const loading = ref<boolean>(false)

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  },
})

/** 获取用户列表 */
const getRoleList = () => {
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
    roleList.value = dataList
    total.value = resData.data.total
  });
}

/** 页大小调整 */
const handleSizeChange = (val: number) => {
  data.queryParam.pageSize = val
  getRoleList()
}

/** 页码调整 */
const handleCurrentChange = (val: number) => {
  data.queryParam.pageNum = val
  getRoleList()
}

/** 搜索 */
const handleSearchChange = () => {
  getRoleList()
}

/** 是否启用变更 */
const handleChangeStatus = (val: any) => {
  const data : ChangeRoleStatusRequestData = {
    roleId: val.id,
    status: val.status
  }
  changeStatusFetch(data)
}

/** 更改角色可用状态 */
const changeStatusFetch = (data: ChangeRoleStatusRequestData) => {
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

getRoleList()
</script>
