import { FC, useEffect } from "react";
import { IItem } from "./model";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import { deleteItem, getItems, selectItems, toggleItem, updateItem } from "../../redux-toolkit/features/data/itemsSlice";
import { TableEditorComponent } from "./TableEditorComponent";

export interface IEditorProps {
  
}

export const TableEditorReduxToolkit:FC<IEditorProps> = () => {

  const dispatch = useAppDispatch();

  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const onSwitchFlag = (itemId: number, propName: string) => {
    return dispatch(toggleItem({itemId, propName}));
  }

  const onItemUpdate = (item: IItem) => {
    return dispatch(updateItem(item));
  }

  const onItemRemove = (item: IItem) => {
    return dispatch(deleteItem(item))
  }

  return (
    <TableEditorComponent 
      items={items}
      onItemUpdate={onItemUpdate}
      onItemRemove={onItemRemove}
      onSwitchFlag={onSwitchFlag}
    />
  ) 

}




