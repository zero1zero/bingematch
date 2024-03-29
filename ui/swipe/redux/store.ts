import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../auth/auth";
import {queueSlice} from "../queue/reducer";
import {listsSlice} from "../likes/reducer";
import {seenItSlice} from "../seenit/reducer";

export const store = configureStore({
    reducer: {
        queue: queueSlice.reducer,
        auth: authSlice.reducer,
        lists: listsSlice.reducer,
        seenIt: seenItSlice.reducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
