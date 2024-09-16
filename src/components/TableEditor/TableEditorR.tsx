import { FC,  } from "react";
import { TableEditorComponent } from "./TableEditorComponent";
import { IItem } from "./model";

export interface IEditorProps {
  
}

export const TableEditorRedux:FC<IEditorProps> = () => {

  const items: IItem[] = [];
  const onSwitchFlag = (itemId: number, propName: string) => {
    return {};
  }

  const onItemUpdate = (item: IItem) => {
    return fetch('1');
  }

  const onItemRemove = (item: IItem) => {
    return fetch('1');
  }

  return (
    // <Provider store={store}>
      <TableEditorComponent 
        items={items}
        onItemUpdate={onItemUpdate}
        onItemRemove={onItemRemove}
        onSwitchFlag={onSwitchFlag}
      />
    // </Provider>
  ) 

}




