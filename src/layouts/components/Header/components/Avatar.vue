<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img :src="avatar" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="openDialog('infoRef')">
					<el-icon><User /></el-icon>{{ $t('header.personalData') }}
				</el-dropdown-item>
				<el-dropdown-item @click="openDialog('passwordRef')">
					<el-icon><Edit /></el-icon>{{ $t('header.changePassword') }}
				</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>
					<el-icon><SwitchButton /></el-icon>{{ $t('header.logout') }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<!-- infoDialog -->
	<InfoDialog ref="infoRef"></InfoDialog>
	<!-- passwordDialog -->
	<PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { GlobalStore } from '@/stores'
import { LOGIN_URL } from '@/config/config'
import { ElMessageBox, ElMessage } from 'element-plus'
import InfoDialog from './InfoDialog.vue'
import PasswordDialog from './PasswordDialog.vue'
import { loginOut } from '@/api/modules/login'
import { ResultData } from '@/api/interface'

const router = useRouter()
const globalStore = GlobalStore()

const avatar = globalStore.avatar

// 退出登录
const logout = () => {
	ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		loginOut().then((res: ResultData) => {
			if (res.code === 200) {
				router.replace(LOGIN_URL)
				globalStore.setToken('')
				ElMessage({
					type: 'success',
					message: res.message
				})
			}
		})
	})
}

interface DialogExpose {
	openDialog: () => void
}
const infoRef = ref<null | DialogExpose>(null)
const passwordRef = ref<null | DialogExpose>(null)
// 打开修改密码和个人信息弹窗
const openDialog = (refName: string) => {
	if (refName === 'infoRef') return infoRef.value?.openDialog()
	passwordRef.value?.openDialog()
}
</script>

<style scoped lang="scss">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
