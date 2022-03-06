<template>
  <div>
    <p style="text-align: center;font-size: 140px;margin-bottom: 50px;">
      404
    </p>
    <p style="text-align: center;font-size: 40px;">
      未找到你想要的页面
    </p>
  </div>
</template>

<script lang="ts" setup>

import { onMounted } from 'vue'

onMounted(() => {
  console.log("404")
})
</script>
