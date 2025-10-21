import { VNode, Ref } from "vue";
import { BreakPoint, Responsive } from "./grid";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

interface ProTableProps {
  columns: ColumnProps[];
  data?: any[];
  requestApi?: (params: any) => Promise<any>;
  requestAuto?: boolean;
  requestError?: (params: any) => void;
  dataCallback?: (data: any) => any;
  rowClick?: (data: any) => any;
  title?: string;
  pagination?: boolean;
  initParam?: any;
  border?: boolean;
  toolButton?: ("refresh" | "setting" | "search")[] | boolean;
  rightButton?: boolean;
  rowKey?: string;
  searchCol?: number | Record<BreakPoint, number>;
  gridSuffix?: boolean;
  maxHeight?: number;
}

export interface EnumProps {
  label?: string;
  value?: string | number | boolean | any[];
  disabled?: boolean;
  tagType?: string;
  children?: EnumProps[];
  [key: string]: any;
}

export interface colProps {
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  [key: string]: any;
}

export type TypeProps = "index" | "selection" | "radio" | "expand" | "sort";

export type SearchType =
  | "input"
  | "input-number"
  | "select"
  | "select-v2"
  | "tree-select"
  | "cascader"
  | "date-picker"
  | "time-picker"
  | "time-select"
  | "switch"
  | "slider"
  | "checkbox-group"
  | "radio-group";

export type SearchRenderScope = {
  searchParam: { [key: string]: any };
  placeholder: string;
  clearable: boolean;
  options: EnumProps[];
  data: EnumProps[];
};

export type SearchProps = {
  el?: SearchType;
  useFlex?: boolean;
  label?: string;
  props?: any;
  key?: string;
  isMultiple?: boolean;
  tooltip?: string;
  order?: number;
  span?: number;
  col?: colProps;
  offset?: number;
  defaultValue?: string | number | boolean | any[] | Ref<any>;
  render?: (scope: SearchRenderScope) => VNode;
} & Partial<Record<BreakPoint, Responsive>>;

export type FieldNamesProps = {
  label: string;
  value: string;
  children?: string;
};

export type RenderScope<T> = {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

export type HeaderRenderScope<T> = {
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

export interface ColumnProps<T = any>
  extends Partial<
    Omit<TableColumnCtx<T>, "type" | "children" | "renderCell" | "renderHeader">
  > {
  type?: TypeProps;
  tag?: boolean | Ref<boolean>;
  isShow?: boolean | Ref<boolean>;
  search?: SearchProps | undefined;
  enum?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>);
  isFilterEnum?: boolean | Ref<boolean>;
  fieldNames?: FieldNamesProps;
  headerRender?: (scope: HeaderRenderScope<T>) => VNode;
  render?: (scope: RenderScope<T>) => VNode | string;
  _children?: ColumnProps<T>[];
}
