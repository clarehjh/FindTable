export interface StateProps {
  tableData: any[];
  pageable: Pageable;
  searchParam: {
    [key: string]: any;
  };
  searchInitParam: {
    [key: string]: any;
  };
  totalParam: {
    [key: string]: any;
  };
}

export interface Pageable {
  pageNum: number;
  pageSize: number;
  total: number;
}

export namespace HandleData {
  export type MessageType = "success" | "warning" | "info" | "error";
}
