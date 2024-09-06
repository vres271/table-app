import { FC, useReducer } from "react";
import { Table } from "./Table";
import "./TableEditor.css";
import { Head } from "./Head";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { Caption } from "./Caption";
import { Paginator } from "./Paginator";
import { Row } from "./Row";
import { HeadCell } from "./HeadCell";
import { Cell } from "./Cell";
import { IEditorState, IItem } from "./model";
import { ActionType, tableReducer } from "./reducer";

export interface IEditorProps {
  items: IItem[];
}

export const initialState: IEditorState = {
  paging: {
    curentPage: 1,
    rowsPerPage: 10,
  },
}

const blackList = [
  'description',
  'url',
  'email',
];

export const Editor:FC<IEditorProps> = ({items}) => {

  const [settings, dispatch] = useReducer(tableReducer, initialState);

  const {sort, paging} = settings;
  const offset = paging.rowsPerPage * (paging.curentPage - 1);

  const setSorting = (value: string) => dispatch({type: ActionType.SET_SORTING, value});
  const setPage = (value: number) => dispatch({type: ActionType.SET_PAGE, value});
  const setRowOnPage = (value: number) => dispatch({type: ActionType.SET_ROWS_ONPAGE, value});

  const _items = [...items]
    .sort((a, b) => {
      if (sort?.order === undefined) return 0;
      const aValue = a[sort.by];
      const bValue = b[sort.by];
      switch (typeof aValue) {
        case 'number':
          return sort.order ? +aValue - +bValue : +bValue - +aValue;
        case 'string':
          return sort.order ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        default:
          return 0;
      }
    })
    .splice(offset, paging.rowsPerPage)

  const columns = [...Object.entries(items?.[0])]
    .map(([key]) => key)
    .filter(key => !blackList.includes(key));
  
  return (
    <div className="table-editor">
      <h1> editor ({items.length}) - Sort by {sort?.by} {sort?.order ? '\\/' :  '/\\' }</h1>
      <Table>
        <Caption>
          <Paginator 
            paging={paging}
            count={+items?.length}
            onPageChange={setPage}
            onRowOnPageChange={setRowOnPage}
          ></Paginator>
        </Caption>
        <Head>
          <Row>
            {columns.map((colName, i) => 
              <HeadCell 
                key={i} 
                name={colName} 
                active={sort?.by === colName}
                direction={!!sort?.order}
                onSortBy={setSorting}/>
            )}
          </Row>
        </Head>
        <Body>
          {_items.map((item, i) => 
            <Row key={item?.id}>
              {columns.map((colName, i) => 
                <Cell key={i} value={item[colName]} />
              )}
            </Row>
          )}
        </Body>
        <Footer />
      </Table>
    </div>
  );
}


