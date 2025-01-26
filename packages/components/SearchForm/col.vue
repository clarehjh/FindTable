<template>
  <div v-if="columns.length" class="table-search">
    <el-form ref="formRef" :model="searchParam">
      <el-row ref="gridRef" :gutter="20" justify="space-between">
        <template v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
          <el-col v-for="(item, colIndex) in row" :key="`col-${colIndex}`" v-bind="getResponsive(item)">
            <el-form-item>
              <template #label>
                <el-space :size="4">
                  <span>{{ `${item.search?.label ?? item.label}` }}</span>
                  <el-tooltip v-if="item.search?.tooltip" effect="dark" :content="item.search?.tooltip" placement="top">
                    <i :class="'iconfont icon-yiwen'"></i>
                  </el-tooltip>
                </el-space>
                <span>&nbsp;:</span>
              </template>
              <SearchFormItem :column="item" :search-param="searchParam" />
            </el-form-item>
          </el-col>
          <!-- 操作按钮区域在当前行 -->
          <el-col v-if="rowIndex === rows.length - 1" :xs="24" :sm="12" :md="2" :lg="2" :xl="2">
            <div class="operation" style="text-align: right">
              <el-button type="primary" @click="search"> 查询 </el-button>
              <el-button @click="reset"> 重置 </el-button>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts" name="SearchForm">
import { computed } from "vue";
import { ColumnProps } from "../table/interface";
import { BreakPoint } from "../Grid/interface";
import SearchFormItem from "./components/SearchFormItem.vue";
// import Grid from "@/components/Grid/index.vue";
// import GridItem from "@/components/Grid/components/GridItem.vue";

interface ProTableProps {
  columns?: ColumnProps[]; // 搜索配置列
  searchParam?: { [key: string]: any }; // 搜索参数
  searchCol: number | Record<BreakPoint, number>;
  search: (params: any) => void; // 搜索方法
  reset: (params: any) => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  searchParam: () => ({})
});

// 响应式获取列宽比例
const getResponsive = (item: ColumnProps) => {
  const isCheckboxGroup = item.search?.el === "checkbox-group";
  const col = item.search?.col || {}; // Default to an empty object if col is undefined

  return {
    xs: isCheckboxGroup ? (col.xs ?? 24) : 24, // checkbox-group on small screens takes full width
    sm: isCheckboxGroup ? (col.sm ?? 24) : 12, // checkbox-group on medium screens takes 12 columns
    md: isCheckboxGroup ? (col.md ?? 8) : 8, // checkbox-group on large screens takes 8 columns
    lg: isCheckboxGroup ? (col.lg ?? 6) : 6, // checkbox-group on extra large screens takes 6 columns
    xl: isCheckboxGroup ? (col.xl ?? 6) : 6 // checkbox-group on extra large screens takes 6 columns
  };
};

const rows = computed(() => {
  const groupedRows: ColumnProps[][] = [];
  let currentRow: ColumnProps[] = [];
  let currentSpan = 0;

  props.columns.forEach(item => {
    const itemSpan = item.search?.span ?? 24;
    currentSpan += itemSpan;

    if (currentSpan > 24) {
      groupedRows.push(currentRow);
      currentRow = [];
      currentSpan = itemSpan;
    }
    currentRow.push(item);
  });

  if (currentRow.length) {
    groupedRows.push(currentRow);
  }

  return groupedRows;
});
</script>
<style scoped>
.flex-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: first baseline;
}
</style>
