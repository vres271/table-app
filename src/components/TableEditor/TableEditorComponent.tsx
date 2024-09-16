import { FC, useContext, useReducer } from "react";
import { IEditorState, IItem } from "./model";
import { ThemeContext } from "../../App";
import { ActionType, tableReducer } from "./reducer";
import { Table } from "./Table";
import { Caption } from "./Caption";
import { Paginator } from "./Paginator";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Footer } from "./Footer";
import { Form } from "./Form/Form";
import { Head } from "./Head";
import { HeadCell } from "./HeadCell";
import { Row } from "./Row";
import { SideBar } from "./SideBar/SideBar";
import "./TableEditor.css";

export const initialState: IEditorState = {
    paging: {
      curentPage: 1,
      rowsOnPage: 10,
    },
    isSidebarVisible: false,
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
  
export interface IEditorComponentProps {
    items: IItem[];
    onItemUpdate: (item: IItem) => Promise<any>
    onItemRemove: (item: IItem) => Promise<any>
    onSwitchFlag: (itemId: number, propName: string) => {}
  }

export const TableEditorComponent:FC<IEditorComponentProps> = ({items, onItemUpdate,  onItemRemove,  onSwitchFlag}) => {

    const theme = useContext(ThemeContext);
  
    const [settings, dispatch] = useReducer(tableReducer, initialState);
    const {sort, paging, isSidebarVisible, selectedItem, loadingItem} = settings;
    const offset = paging.rowsOnPage * (paging.curentPage - 1);
  
    const setSorting = (value: string) => dispatch({type: ActionType.SET_SORTING, value});
    const setPage = (value: number) => dispatch({type: ActionType.SET_PAGE, value});
    const setRowOnPage = (value: number) => dispatch({type: ActionType.SET_ROWS_ONPAGE, value});
    const setSidebarVisible = (value: boolean) => dispatch({type: ActionType.SET_SIDEBAR_VISIBLE, value});
    const setSelectedItem = (value: IItem | undefined) => dispatch({type: ActionType.SET_SELECTED_ITEM, value});
    const setLoadingItem = (value: IItem | undefined) => dispatch({type: ActionType.SET_LOADING_ITEM, value});
  
    const submitForm = (changedItem: IItem) => {
      setLoadingItem(selectedItem);
      onItemUpdate(changedItem).then(() => setLoadingItem(undefined));
      closeEditor();
    }
  
    const removeItem = (item: IItem) => {
      setLoadingItem(item);
      onItemRemove(item).then(() => setLoadingItem(undefined));
      closeEditor();
    }
  
    const openEditor = (value: IItem) => {
      setSidebarVisible(true);
      setSelectedItem(value)
    }
  
    const closeEditor = () => {
      setSidebarVisible(false);
      setSelectedItem(undefined);
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
            }>
              <HeadCell name={''} />
            </Row>
          </Head>
          <Body
            items={_items} 
            renderRow={ (item) => 
            <Row 
              key={item?.id}
              selected={selectedItem === item}
              loading={loadingItem === item}
              values={ columns.map((colName, i) => valueExtractor(item, colName)) }
              renderRow={ (value, i) => 
              <Cell key={i} value={value} onClick={() => openEditor(item)} onSwitch={(val) => onSwitchFlag(item.id, columns[i])}/>
            }>
              <td onClick={() => removeItem(item)} className="delete">X</td>
            </Row>
          }/>
          <Footer />
        </Table>
        <SideBar 
          title="Редактировать" 
          onClose={closeEditor}
          visible={isSidebarVisible}>
            <Form 
              item={selectedItem} 
              onSubmit={submitForm}
              onCancel={closeEditor}
            />
        </SideBar>
      </div>
    );
  }
  