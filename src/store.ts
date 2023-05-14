import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './features/search/searchSlice';
import tableSlice from './features/table/tableSlice';

export const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	reducer: {
		search: searchSlice,
		table: tableSlice,
	},
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
