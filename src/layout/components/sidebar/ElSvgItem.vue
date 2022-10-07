<template>
  <el-icon class="el-svg-icon">
    <component :is="ElSvg[elSvgName]" />
  </el-icon>
</template>

<script lang="ts" setup>
import * as ElSvg from '@element-plus/icons-vue'

/** 设置默认值，定义类型 */
const props = defineProps({
  elSvgName: {
    require: true,
    default: 'Fold',
    type: String
  }
})
</script>

<style scoped lang="scss">
.el-svg-icon {
  width: 1.25em;
  height: 1.25em;
  margin-left: 0.25em; //el-svg-icon has some margin
  font-size: 20px !important;
  text-align: left !important;
}
</style>
