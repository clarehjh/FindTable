<template>
  <div class="pro-search-form">
    <div class="pro-search-form__fields">
      <!-- 这里先占位：按列渲染搜索项的实现可后续补充 -->
    </div>
    <div class="pro-search-form__actions">
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import type { ColumnProps } from "../types";

const props = defineProps({
  columns: {
    type: Array as PropType<ColumnProps[]>,
    default: () => [],
  },
  searchParam: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  searchCol: {
    type: [Number, Object] as PropType<number | Record<string, number>>,
    default: 1,
  },
  gridSuffix: {
    type: Boolean,
    default: true,
  },
  showCollapse: {
    type: Boolean,
    default: false,
  },
  search: {
    type: Function as PropType<() => void>,
    required: true,
  },
  reset: {
    type: Function as PropType<() => void>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "search"): void;
  (e: "reset"): void;
}>();

const onSearch = () => {
  typeof props.search === "function" && props.search();
  emit("search");
};

const onReset = () => {
  typeof props.reset === "function" && props.reset();
  emit("reset");
};
</script>

<style scoped>
.pro-search-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.pro-search-form__actions {
  display: flex;
  gap: 8px;
}
</style>
