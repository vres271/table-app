import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IItem } from '../../components/TableEditor/model'

// Define a type for the slice state
interface ItemsState {
  items: IItem[]
}

// Define the initial state using that type
const initialState: ItemsState = {
  items: []
}

export const itemsSlice = createSlice({
  name: 'items',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IItem[]>) => {
      state.items = action.payload
    }
  },
})

export const { set } = itemsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectItems = (state: RootState) => state.data.items

export default itemsSlice.reducer