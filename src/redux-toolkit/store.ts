import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter/counterSlice';
import itemsSlice from './features/data/itemsSlice';
import userSlice from './features/user/userSlice';

// ...

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    data: itemsSlice,
    user: userSlice,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store;