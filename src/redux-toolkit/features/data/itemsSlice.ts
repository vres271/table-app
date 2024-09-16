import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../redux-toolkit/store'
import { IItem } from '../../../components/TableEditor/model'
import { EntityRout, getApi } from '../../../api/api';


// Define a type for the slice state
interface ItemsState {
  isLoading: boolean;
  items: IItem[];
}

// Define the initial state using that type
const initialState: ItemsState = {
  isLoading: false,
  items: [],
}

const toDosApi = getApi(EntityRout.ToDos);

export const getItems = createAsyncThunk<IItem[], undefined, {rejectValue: string}>(
  'items/getItems',
  async () =>  {
    return await toDosApi.get()
  }
);
export const updateItem = createAsyncThunk<IItem, IItem, {rejectValue: string}>(
  'items/updateItem', 
  async (item: IItem) => await toDosApi.update(item)
)
export const deleteItem = createAsyncThunk<IItem, IItem, {rejectValue: string}>(
  'items/deleteItem', 
  async (item: IItem) => {
    await toDosApi.delete(item.id);
    return item;
  },
)
export const toggleItem = createAsyncThunk<IItem, {itemId: number, propName: string}, {rejectValue: string, state: {data: ItemsState}}>(
  'items/toggleItem', 
  async (payload, {getState, rejectWithValue}) => {
    const item = getState().data.items.find(x => x.id === payload.itemId)
    if (item) {
      return await toDosApi.update({
        ...item,
        [payload.propName]: !item?.[payload.propName]
      })
    }
    return rejectWithValue('Not found');
  }
)


const itemsSlice = createSlice({
  name: 'items',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IItem[]>) => {
      state.items = action.payload
    },
    setById: (state, action: PayloadAction<{id: number, srcItem: IItem}>) => {
      const {id, srcItem} = action.payload;
      const targetItem = state.items.find(item => item.id = id);
      if (targetItem) {
        Object.assign(targetItem, srcItem);
      }
    },
    // switchFlag: (state, action: PayloadAction<{itemId: number, propName: String, value: boolean}>) => {
    //   const {itemId, propName, value} = action.payload;
    //   const item = state.items.find(item => item.id === itemId);
    //   if (item?.id) {
    //     item[propName as any] = value;
    //   }
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        if (updatedItem) {
          const existedItem = state.items.find(item => item.id === updatedItem.id);
          if (existedItem) {
            Object.assign(existedItem, updatedItem);
          }
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const deletedItem = action.payload;
        if (deletedItem) {
          const i = state.items.findIndex(item => item.id === deletedItem.id);
          state.items.splice(i, 1);
        }
      })
      .addCase(toggleItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        if (updatedItem) {
          const existedItem = state.items.find(item => item.id === updatedItem.id);
          if (existedItem) {
            Object.assign(existedItem, updatedItem);
          }
        }        
      })

  },
})

export const { set } = itemsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.data.items;
export const isItemsLoading = (state: RootState) => state.data.isLoading;
export default itemsSlice.reducer