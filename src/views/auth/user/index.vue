<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          <el-input
            style="width: 20%"
            v-model="data.queryParam.queryKey"
            placeholder="Please input"
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
        <el-table :data="userList" height="250" style="width: 100%;height: 600px">
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
          <el-table-column prop="remark" label="备注" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button type="primary" size="small" @click="handleClickDetail">Detail</el-button>
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
import { list } from '@/api/auth/user'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const userList = ref([])
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
const getUserList = () => {
  loading.value = true
  list(data.queryParam).then(res => {
    loading.value = false
    let dataList = res.data.list
    userList.value = dataList
    total.value = res.data.total
  });
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
  ElMessage({
    showClose: true,
    message: `触发搜索, 关键词为: ${data.queryParam.queryKey}`,
  })
  getUserList()
}

/** 详情 */
const handleClickDetail = () => {
  ElMessage({
    showClose: true,
    message: '捕捉到点击事件.',
  })
}

getUserList()
</script>
