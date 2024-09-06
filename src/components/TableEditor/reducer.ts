import { Reducer } from "react";
import { IEditorState } from "./model";

type Action =
  | { type: ActionType.SET_SORTING; value: string }
  | { type: ActionType.SET_PAGE; value: number }
  | { type: ActionType.SET_ROWS_ONPAGE; value: number }

export enum ActionType {
  SET_SORTING,
  SET_PAGE,
  SET_ROWS_ONPAGE,
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
    default:
      break;
  }
  return state
}