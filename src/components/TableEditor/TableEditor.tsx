import { FC, useState } from "react";
import { Table } from "./Table";
import "./TableEditor.css";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableCaption } from "./TableCaption";
import { TablePaginator } from "./TablePaginator";

export interface IItem  {
  id: number;
  [index: string]: any;
} 

export interface ITableEditorProps {
  items: IItem[];
}

export interface IFilter {
  colName: string;
  value: any;
}

export interface ITableSort {
  by: string;
  order: boolean;
}

export interface ITablePaging {
  curentPage: number;
  rowsPerPage: number;
}

export interface ITableEditorState {
  sort?: ITableSort;
  paging: ITablePaging;
  filters?: Record<string, IFilter>;
}

export const initialState: ITableEditorState = {
  paging: {
    curentPage: 1,
    rowsPerPage: 10,
  },
}

export const TableEditor:FC<ITableEditorProps> = ({items}) => {

  const [settings, setSettings] = useState<ITableEditorState>(initialState);

  const setSorting = (by: string) => {
    setSettings({
      ...settings,
      sort: {
        by,
        order: by === settings?.sort?.by ? !settings?.sort?.order : !!settings?.sort?.order
      }
    })
  }

  const offset = settings.paging.rowsPerPage * (settings.paging.curentPage - 1);

  const setPage = (page: number) => {
    setSettings({
      ...settings,
      paging: {
        ...settings.paging,
        curentPage: page,
      }
    })

  }

  const setRowOnPage = (onPage: number) => {
    setSettings({
      ...settings,
      paging: {
        curentPage: 1,
        rowsPerPage: onPage,
      }
    })

  }

  const _items = [...items]
    .sort((a, b) => {
      if (settings?.sort?.order === undefined) return 0;
      const aValue = a[settings.sort.by];
      const bValue = b[settings.sort.by];
      switch (typeof aValue) {
        case 'number':
          return settings.sort.order ? +aValue - +bValue : +bValue - +aValue;
        case 'string':
          return settings.sort.order ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        default:
          return 0;
      }
    })
    .splice(offset, settings.paging.rowsPerPage)

  return (
    <div className="table-editor">
      <h1>Table editor ({items.length}) - Sort by {settings?.sort?.by} {settings.sort?.order ? '\\/' :  '/\\' }</h1>
      <Table>
        <TableCaption>
          <TablePaginator 
            paging={settings.paging}
            count={+items?.length}
            onPageChange={setPage}
            onRowOnPageChange={setRowOnPage}
          ></TablePaginator>
        </TableCaption>
        <TableHead 
          item={items?.[0]} 
          sort={settings.sort} 
          onSortBy={setSorting} />
        <TableBody items={_items}/>
        <TableFooter />
      </Table>
    </div>
  );
}


