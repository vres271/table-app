import { Reducer } from "react";
import { IEditorState, IItem } from "./model";

type Action =
  | { type: ActionType.SET_SORTING; value: string }
  | { type: ActionType.SET_PAGE; value: number }
  | { type: ActionType.SET_ROWS_ONPAGE; value: number }
  | { type: ActionType.SET_SIDEBAR_VISIBLE; value: boolean }
  | { type: ActionType.SET_SELECTED_ITEM; value: IItem | undefined }
  | { type: ActionType.SET_LOADING_ITEM; value: IItem | undefined }

export enum ActionType {
  SET_SORTING,
  SET_PAGE,
  SET_ROWS_ONPAGE,
  SET_SIDEBAR_VISIBLE,
  SET_SELECTED_ITEM,
  SET_LOADING_ITEM,
}

export const tableReducer: Reducer<IEditorState, Action> = (state, {type, value}) => {
  switch (type) {
    case ActionType.SET_SORTING:
      const {sort} = state;
      return {
        ...state,
        sort: {
          by: value,
          order: value === sort?.by ? !sort?.order : !!sort?.order
        }
      }
    case ActionType.SET_PAGE:
      const {paging} = state;
      return {
        ...state,
        paging: {
          ...paging,
          curentPage: value,
        }
      }
    case ActionType.SET_ROWS_ONPAGE:
      return {
        ...state,
        paging: {
          curentPage: 1,
          rowsOnPage: value,
        }
      }
    case ActionType.SET_SIDEBAR_VISIBLE:
      return {
        ...state,
        isSidebarVisible: value
      }
    case ActionType.SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: value
      }
    case ActionType.SET_LOADING_ITEM:
      return {
        ...state,
        loadingItem: value
      }
    default:
      break;
  }
  return state
}