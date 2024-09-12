import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IItem } from '../../components/TableEditor/model'
import { EntityRout, getApi } from '../../api/api';


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

export const getItems = createAsyncThunk('items/get', async () => await toDosApi.get())
export const updateItem = createAsyncThunk('items/update', async (item: IItem) => await toDosApi.update(item))
export const deleteItem = createAsyncThunk('items/delete', async (item: IItem) => {
    await toDosApi.delete(item.id);
    return item;
  },
)

export const itemsSlice = createSlice({
  name: 'items',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IItem[]>) => {
      state.items = action.payload
    },
    switchFlag: (state, action: PayloadAction<{itemId: number, propName: String, value: boolean}>) => {
      const {itemId, propName, value} = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item?.id) {
        item[propName as any] = value;
      }
    },
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

    builder
      .addCase(updateItem.fulfilled, (state, action) => {
      const updatedItem = action.payload;
      if (updatedItem) {
        const existedItem = state.items.find(item => item.id === updatedItem.id);
        if (existedItem) {
          Object.assign(existedItem, updatedItem);
        }
      }
    })

    builder
      .addCase(deleteItem.fulfilled, (state, action) => {
        const deletedItem = action.payload;
        if (deletedItem) {
          const i = state.items.findIndex(item => item.id === deletedItem.id);
          state.items.splice(i, 1);
        }
      })

  },
})

export const { set, switchFlag } = itemsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.data.items;
export const isItemsLoading = (state: RootState) => state.data.isLoading;
export default itemsSlice.reducer