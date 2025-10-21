# 使用示例

## 新的包结构使用方式

### 1. 使用表格组件及其相关 hooks

```typescript
// 安装表格包
// npm install @clare-ui/table

import { ProTable, useTable, useSelection, useDownload } from '@clare-ui/table';

// 在组件中使用
export default {
  setup() {
    // 使用表格数据管理 hook
    const { tableData, getTableList, search, reset } = useTable(
      fetchTableData, // API 函数
      {}, // 初始参数
      true, // 是否分页
      (data) => data // 数据处理回调
    );

    // 使用表格多选 hook
    const { selectedList, selectionChange } = useSelection('id');

    // 使用导出功能
    const handleExport = () => {
      useDownload(fetchExportData, '导出数据', {});
    };

    return {
      tableData,
      getTableList,
      search,
      reset,
      selectedList,
      selectionChange,
      handleExport
    };
  }
};
```

### 2. 使用通用工具和 hooks

```typescript
// 安装通用工具包
// npm install @clare-ui/core

import { 
  useOnline, 
  useScreenSize, 
  useTime,
  localGet, 
  localSet,
  isArray,
  generateUUID 
} from '@clare-ui/core';

// 在组件中使用
export default {
  setup() {
    // 网络状态监听
    const { online } = useOnline();

    // 屏幕尺寸监听
    useScreenSize(() => {
      console.log('屏幕尺寸变化');
    });

    // 时间处理
    const { nowTime } = useTime();

    // 本地存储操作
    const saveData = () => {
      localSet('userData', { name: 'John' });
    };

    const loadData = () => {
      return localGet('userData');
    };

    // 工具函数
    const id = generateUUID();
    const isArrayData = isArray([1, 2, 3]);

    return {
      online,
      nowTime,
      saveData,
      loadData,
      id,
      isArrayData
    };
  }
};
```

### 3. 使用完整 UI 库

```typescript
// 安装完整 UI 库
// npm install @clare-ui/nova-ui

import NovaUI from '@clare-ui/nova-ui';
import { createApp } from 'vue';

const app = createApp(App);

// 全局注册所有组件和工具
app.use(NovaUI);

// 或者按需导入
import { 
  ProTable, 
  ProUpload, 
  useTable, 
  useOnline,
  localGet 
} from '@clare-ui/nova-ui';
```

### 4. 只使用上传组件

```typescript
// 安装上传包
// npm install @clare-ui/upload

import { ProUpload } from '@clare-ui/upload';

// 在组件中使用
export default {
  components: {
    ProUpload
  }
};
```

## 包依赖关系

```
@clare-ui/table
├── @clare-ui/core (通用工具)
└── element-plus (UI 框架)

@clare-ui/upload
└── element-plus (UI 框架)

@clare-ui/core
└── vue (Vue 3)

@clare-ui/nova-ui
├── @clare-ui/table
├── @clare-ui/upload
└── @clare-ui/core
```

## 构建和发布

```bash
# 构建所有包
pnpm run build:all

# 构建特定包
pnpm run build:core
pnpm run build:table
pnpm run build:upload
pnpm run build:nova

# 发布包
pnpm run pub
```
