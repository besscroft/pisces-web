<template>
	<div class="common-layout">
		<el-container style="height: 100%">
			<el-header style="margin-top: 12px">
				<el-card class="box-card">
					OSS 管理
				</el-card>
			</el-header>
			<el-main>
				<el-card class="box-card">
					<el-upload
						class="upload-image"
						method="post"
						name="file"
						:headers="token"
						drag
						action="/api/pisces-file/aliyun/oss/uploadCdn"
						multiple
						:on-success="onSuccess"
					>
						<el-icon class="el-icon--upload"><upload-filled /></el-icon>
						<div class="el-upload__text">
							将图片拖动到此处或者 <em>点击上传</em>
						</div>
						<template #tip>
							<div class="el-upload__tip">
								文件大小最大为 5MB
							</div>
						</template>
					</el-upload>
					<div v-if="fileUrl">
						<el-divider />
						<el-tag>文件地址: {{ fileUrl }}</el-tag>
					</div>
				</el-card>
			</el-main>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import { GlobalStore } from '@/stores'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'

const globalStore = GlobalStore()

const token = {
	Authorization: 'Bearer ' + globalStore.token
}

const fileUrl = ref<String>()

const onSuccess = (response: any) => {
	if (response.code == 200) {
		fileUrl.value = response.data
		ElNotification({
			title: 'Success',
			message: '文件上传成功！',
			type: 'success',
		})
	} else {
		ElNotification({
			title: 'Error',
			message: '文件上传失败！',
			type: 'error',
		})
	}
}
</script>
