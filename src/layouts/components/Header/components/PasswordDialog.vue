<template>
	<el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
		<span>开发中</span>
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			:rules="rules"
			label-width="120px"
			class="demo-ruleForm"
			:size="formSize"
			status-icon
		>
			<el-form-item label="旧密码" prop="oldPassword">
				<el-input v-model="ruleForm.oldPassword" />
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword">
				<el-input v-model="ruleForm.newPassword" />
			</el-form-item>
			<el-form-item label="确认密码" prop="verifyPassword">
				<el-input v-model="ruleForm.verifyPassword" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="canalForm(ruleFormRef)">取消</el-button>
				<el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { UpdatePassword } from '@/api/modules/auth/user'

const dialogVisible = ref(false)
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
	oldPassword: '',
	verifyPassword: '',
	newPassword: '',
})

// 密码校验规则
const validatePassword = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请输入密码!'))
	}
	if (ruleForm.newPassword !== ruleForm.verifyPassword) {
		callback(new Error('密码不一致！'))
	}
	callback()
}

const rules = reactive<FormRules>({
	oldPassword: [
		{ required: true, message: '旧密码必填！', trigger: 'blur' },
		{ min: 6, max: 20, message: '长度位于 6~20 之间！', trigger: 'blur' },
	],
	verifyPassword: [
		{ required: true, message: '确认密码必填！', trigger: 'blur' },
		{ min: 6, max: 20, message: '长度位于 6~20 之间！', trigger: 'blur' },
		{ validator: validatePassword, trigger: 'blur' }
	],
	newPassword: [
		{ required: true, message: '新密码必填！', trigger: 'blur' },
		{ min: 6, max: 20, message: '长度位于 6~20 之间！', trigger: 'blur' },
	]
})

// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			UpdatePassword({ oldPassword: ruleForm.oldPassword, newPassword: ruleForm.newPassword }).then((res: any) => {
				dialogVisible.value = false
				ElNotification({
					title: '成功！',
					message: res.message,
					type: 'success',
				})
			})
		} else {
			console.log('error submit!', fields)
		}
	})
}

const canalForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
	dialogVisible.value = false
}

// openDialog
const openDialog = () => {
	dialogVisible.value = true
}

defineExpose({ openDialog })
</script>
