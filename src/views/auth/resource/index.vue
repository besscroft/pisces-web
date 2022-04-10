<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          资源管理
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
          <!-- todo 树形表格 -->
          <el-table v-loading="loading" border :data="resourceList" height="250" style="width: 100%;height: 650px">
            <el-table-column prop="name" label="资源名称" width="100" />
            <el-table-column prop="url" label="资源路径" width="100" />
            <el-table-column prop="description" label="部门描述" />
            <el-table-column prop="sort" label="排序" width="100"/>
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column prop="updateTime" label="更新时间" />
            <el-table-column fixed="right" label="操作" width="150">
              <template #default="scope">
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
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, InfoFilled, Delete } from '@element-plus/icons-vue'
import { List } from '@/api/auth/resource'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const resourceList = ref([])
const loading = ref<boolean>(false)

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  },
})

/** 获取资源列表 */
const getResourceList = () => {
  loading.value = true
  List(data.queryParam).then(res => {
    loading.value = false
    let resData = res.data
    let dataList = resData.data.list
    resourceList.value = dataList
    total.value = resData.data.total
  });
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
  ElMessage({
    showClose: true,
    type: 'warning',
    message: '还没写！'
  })
}

getResourceList()
</script>
