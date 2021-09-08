import {createSlice} from "@reduxjs/toolkit";

export type ListsState = {
    updated: number
}

export const listsStateDefault: ListsState = {
    updated: 0
}

export const listsSlice = createSlice({
    name: 'lists-updated',
    initialState: listsStateDefault,
    reducers: {

        listsUpdated: (state) => {
            state.updated = state.updated + 1
        },

    }
})

export const { listsUpdated } = listsSlice.actions
