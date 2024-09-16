import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface IUser {
	id: number;
	name: string;
	email: string;
}

export interface IUserState {
	user: IUser | null;
	isAuth: boolean;
}

export const initialState: IUserState = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
		setIsAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
	}
})

export const {setUser, setIsAuth} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
