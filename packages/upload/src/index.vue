<template>
  <el-upload v-bind="$attrs" :auto-upload="false" class="pro-upload">
    <el-button type="primary">选择文件</el-button>
  </el-upload>
</template>

<script setup lang="ts">
// 简版占位，解除缺失组件错误；后续可扩展 props/事件
</script>

<style scoped>
.pro-upload {
  display: inline-block;
}
</style>
