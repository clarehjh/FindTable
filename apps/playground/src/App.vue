<template>
  <div style="padding: 24px">
    <h2>Nova UI Playground</h2>
    <div style="margin: 12px 0">
      <el-button type="primary" @click="reload++"
        >刷新表格 ({{ reload }})</el-button
      >
    </div>
    <ProTable v-if="showTable" v-bind="tableProps" />
    <div style="height: 24px"></div>
    <ProUpload />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ProTable } from "@clare-ui/table";
import { ProUpload } from "@clare-ui/upload";

const reload = ref(0);
const showTable = computed(() => reload.value % 2 === 0);

const tableProps = {
  columns: [],
  data: [],
};
</script>
