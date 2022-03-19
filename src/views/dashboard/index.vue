<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-card class="box-card" style="margin-top: 12px">
          欢迎来到 Pisces Cloud
        </el-card>
      </el-header>
      <el-main>
        <el-space wrap size="36">
          <el-card class="box-card" style="width: 360px">
            <template #header>
              <div class="card-header">
                <span>项目介绍</span>
              </div>
            </template>
            <div class="text item">
              基于 Spring Cloud 2021 & Alibaba 2021.1 + Spring Security OAuth2 + PostgreSQL + Mybatis & Plus 构建。只实现基础框架能力，不涉及具体业务。
            </div>
          </el-card>
          <el-card class="box-card" style="width: 360px">
            <template #header>
              <div class="card-header">
                <span>Pisces 开发者中心</span>
              </div>
            </template>
            <div class="text item">
              <el-button type="primary" @click="forkAndPush">贡献项目</el-button><br/>
              <el-button style="margin-top: 8px" type="primary" @click="toDeveloper">阅读文档</el-button>
            </div>
          </el-card>
          <el-card class="box-card" style="width: 360px">
            <template #header>
              <div class="card-header">
                <span>待办事项</span>
              </div>
            </template>
            <div class="text item">
              <div v-for="o in 4" :key="o" class="text item">{{ '• 待办事项 ' + o }}</div>
            </div>
          </el-card>
        </el-space>
      </el-main>
      <el-footer>

      </el-footer>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
const forkAndPush = () => {
  window.open("https://github.com/besscroft/aurora-mall/blob/main/fork-and-push.md", "_blank");
}
const toDeveloper = () => {
  window.open("https://developer.besscroft.com/", "_blank");
}
</script>
