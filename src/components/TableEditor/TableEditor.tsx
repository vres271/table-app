import { FC, useContext, useReducer } from "react";
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
import { ThemeContext } from "../../App";
import { useAppDispatch } from "../../app/hooks";
import { switchFlag } from "../../features/data/itemsSlice";

export interface IEditorProps {
  items: IItem[];
}

export const initialState: IEditorState = {
  paging: {
    curentPage: 1,
    rowsOnPage: 10,
  },
}

const blackList = [
  'description',
  'url',
  'email',
  'telephone',
  'dob',
];

const valueExtractor = (item: IItem, colName: string): string | number | boolean => {
  switch (colName) {
    case 'address':
      const {street, town, postode} = item.address;
      return `${postode}, ${town}, ${street}`
    default:
      break;
  }

  const value = item[colName];
  switch (typeof value) {
    case 'number':
    case 'boolean':
      return value;
    default:
      return value.toString();
  }
}

export const TableEditor:FC<IEditorProps> = ({items}) => {

  const theme = useContext(ThemeContext);

  const [settings, dispatch] = useReducer(tableReducer, initialState);
  const {sort, paging} = settings;
  const offset = paging.rowsOnPage * (paging.curentPage - 1);

  const setSorting = (value: string) => dispatch({type: ActionType.SET_SORTING, value});
  const setPage = (value: number) => dispatch({type: ActionType.SET_PAGE, value});
  const setRowOnPage = (value: number) => dispatch({type: ActionType.SET_ROWS_ONPAGE, value});
  
  const dispatchApp = useAppDispatch();
  const handleSwitchInCell = (value: boolean, itemId: number, colName: string) => {
    dispatchApp(switchFlag({itemId, propName: colName, value}));
  }

  if (!items?.length) {
    return <h2>No data</h2>
  }

  const _items = [...items]
    .sort((a, b) => {
      if (sort?.order === undefined) return 0;
      const aValue = valueExtractor(a, sort.by);
      const bValue = valueExtractor(b, sort.by);
      switch (typeof aValue) {
        case 'number':
        case 'boolean':
          return sort.order ? +aValue - +bValue : +bValue - +aValue;
        case 'string':
          return sort.order ? aValue.localeCompare(bValue as string) : (bValue as string).localeCompare(aValue);
        default:
          return 0;
      }
    })
    .splice(offset, paging.rowsOnPage)

  const columns = [...Object.entries(items?.[0])]
    .map(([key]) => key)
    .filter(key => !blackList.includes(key));
  const t = new Date().getTime();
  return (
    <div className={ 'table-editor ' + theme }>
      <h1>Table editor ({theme}). Items: ({items.length}) - Sort by {sort?.by} {sort?.order ? '\\/' :  '/\\' }</h1>
      <small>{t}</small>
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
          <Row
            values={ columns.map((colName, i) => colName) }
            renderRow={ (colName, i) => 
            <HeadCell 
              key={i} 
              name={colName} 
              active={sort?.by === colName}
              direction={!!sort?.order}
              onSortBy={setSorting}/>              
          }/>
        </Head>
        <Body
          items={_items} 
          renderRow={ (item) => 
          <Row 
            key={item?.id} 
            values={ columns.map((colName, i) => valueExtractor(item, colName)) }
            renderRow={ (value, i) => 
            <Cell key={i} value={value} onSwitch={(val) => handleSwitchInCell(val, item.id, columns[i])}/>
          }/>
        }/>
        <Footer />
      </Table>
    </div>
  );
}


