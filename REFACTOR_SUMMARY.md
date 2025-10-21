# Monorepo 重构总结

## 重构目标
将过度拆分的 Monorepo 结构重新组织，将相关功能合并到同一个包中，减少不必要的包分离。

## 新的包结构

### 1. `@clare-ui/table` - 表格组件包
**包含内容：**
- 表格组件 (`ProTable`)
- 表格相关的 hooks：
  - `useTable` - 表格数据管理
  - `useSelection` - 表格多选操作
  - `useDownload` - 表格数据导出
  - `useHandleData` - 表格数据操作确认
- 表格相关的类型定义
- 搜索表单组件
- 网格布局组件

### 2. `@clare-ui/upload` - 上传组件包
**包含内容：**
- 上传组件 (`ProUpload`)
- 上传相关的功能

### 3. `@clare-ui/core` - 通用工具包
**包含内容：**
- 通用的 hooks：
  - `useOnline` - 网络状态监听
  - `useScreenSize` - 屏幕尺寸监听
  - `useTime` - 时间处理
- 通用的工具函数：
  - localStorage 操作
  - 类型判断函数
  - 时间处理函数
  - 菜单处理函数
  - 数据格式化函数

### 4. `@clare-ui/nova-ui` - 主包
**包含内容：**
- 统一导出所有组件和工具
- Vue 插件安装器
- 样式导入

## 重构前后对比

### 重构前（过度拆分）
```
packages/
├── hooks/          # 所有 hooks 混在一起
├── utils/          # 所有工具函数
├── types/          # 类型定义
├── table/          # 只有表格组件
├── upload/         # 只有上传组件
└── nova-ui/        # 主包
```

### 重构后（按功能分组）
```
packages/
├── core/           # 通用工具和 hooks
├── table/          # 表格相关所有内容
├── upload/         # 上传组件
└── nova-ui/        # 主包
```

## 优势

1. **逻辑清晰**：相关功能聚合在一起，更容易理解和维护
2. **减少依赖**：表格相关的 hooks 不再需要单独发布，减少包管理复杂度
3. **更好的开发体验**：开发者只需要安装 `@clare-ui/table` 就能获得所有表格相关功能
4. **减少包数量**：从 6 个包减少到 4 个包

## 使用方式

### 安装
```bash
# 安装整个 UI 库
npm install @clare-ui/nova-ui

# 或者只安装表格组件
npm install @clare-ui/table

# 或者只安装通用工具
npm install @clare-ui/core
```

### 使用
```typescript
// 使用表格组件和其 hooks
import { ProTable, useTable, useSelection } from '@clare-ui/table';

// 使用通用工具
import { useOnline, localGet, localSet } from '@clare-ui/core';

// 使用完整 UI 库
import NovaUI from '@clare-ui/nova-ui';
```

## 构建脚本更新

- 移除了 `build:hooks` 和 `build:utils` 脚本
- 新增了 `build:core` 脚本
- 更新了依赖关系，table 包依赖 core 包
- 更新了构建顺序，确保 core 包先构建
