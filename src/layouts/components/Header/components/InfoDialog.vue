<template>
	<el-dialog v-model="dialogVisible" title="个人信息" width="620px">
		<el-descriptions title="个人详细信息展示" :column="4" :border="true" direction="vertical">
			<el-descriptions-item label="用户id">{{ userInfo.id }}</el-descriptions-item>
			<el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
			<el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
			<el-descriptions-item label="昵称">{{ userInfo.name }}</el-descriptions-item>
			<el-descriptions-item label="真实姓名">{{ userInfo.realName }}</el-descriptions-item>
			<el-descriptions-item label="手机">{{ userInfo.telephone }}</el-descriptions-item>
			<el-descriptions-item label="生日">{{ userInfo.birthday }}</el-descriptions-item>
			<el-descriptions-item label="性别">
				<template #default>
					<el-tag v-if="userInfo.sex === 1" size="small">男</el-tag>
					<el-tag v-else size="small">女</el-tag>
				</template>
			</el-descriptions-item>
			<el-descriptions-item label="创建者">{{ userInfo.creator }}</el-descriptions-item>
			<el-descriptions-item label="更新者">{{ userInfo.updater }}</el-descriptions-item>
			<el-descriptions-item label="创建时间">{{ userInfo.createTime }}</el-descriptions-item>
			<el-descriptions-item label="更新时间">{{ userInfo.updateTime }}</el-descriptions-item>
			<el-descriptions-item label="备注">{{ userInfo.remark }}</el-descriptions-item>
		</el-descriptions>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">关闭</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GlobalStore } from '@/stores'
import { GetUserInfoByUserName } from '@/api/modules/auth/user'

const globalStore = GlobalStore()
const dialogVisible = ref(false)
const loading = ref<boolean>(false)
const userInfo = ref({})

// openDialog
const openDialog = () => {
	dialogVisible.value = true
	getUserInfo()
}

const getUserInfo = () => {
	loading.value = true
	let username = globalStore.username
	GetUserInfoByUserName(username).then((res: any) => {
		loading.value = false
		userInfo.value = res.data
	})
}

defineExpose({ openDialog })
</script>
