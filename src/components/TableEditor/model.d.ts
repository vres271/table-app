export interface IItem {
  id: number;
  [index: string]: any;
}

export interface IFilter {
  colName: string;
  value: any;
}

export interface ISort {
  by: string;
  order: boolean;
}

export interface IPaging {
  curentPage: number;
  rowsPerPage: number;
}

export interface IEditorState {
  sort?: ISort;
  paging: IPaging;
  filters?: Record<string, IFilter>;
}
