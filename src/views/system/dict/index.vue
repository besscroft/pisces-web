<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="margin-top: 12px">
        <el-card class="box-card">
          字典管理
        </el-card>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-table
            :data="dictList"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            default-expand-all
          >
            <el-table-column prop="groupName" label="字典分组" width="180" />
            <el-table-column prop="key" label="字典 key" width="180" />
            <el-table-column prop="value" label="字典值" width="180" />
            <el-table-column prop="remark" label="备注"/>
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
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { List } from '@/api/system/dict'
import {ElMessage} from "element-plus";

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const small = ref(false)
const background = ref(false)
const disabled = ref<boolean>(false)
const dictList = ref([])
const loading = ref<boolean>(false)
const dialogVisibleUpdateDict = ref<boolean>(false)
const dialogVisibleAddDict = ref<boolean>(false)

const data = reactive({
  form: {},
  queryParam: {
    pageNum: 1,
    pageSize: 10,
    queryKey: ''
  },
})

/** 获取菜单列表 */
const getDictList = () => {
  loading.value = true
  List(data.queryParam).then(res => {
    loading.value = false
    let resData = res.data
    let dataList = resData.data.list
    dictList.value = dataList
    total.value = resData.data.total
  });
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
const handleEdit = () => {
  ElMessage({
    showClose: true,
    type: 'warning',
    message: '功能还没做呢！'
  })
}

/** 字典删除 */
const handleDelete = (val: number) => {
  ElMessage({
    showClose: true,
    type: 'warning',
    message: '功能还没做呢！'
  })
}

getDictList()
</script>
