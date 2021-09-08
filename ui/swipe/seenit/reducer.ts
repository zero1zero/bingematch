import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type LastSeenIt = {
    show: string,
    rating: number
}

export type SeenItState = {
    lastSeenItShow: LastSeenIt
}

export const seenItStateDefault: SeenItState = {
    lastSeenItShow: { show: undefined, rating: 0 }
}

export const seenItSlice = createSlice({
    name: 'seenit',
    initialState: seenItStateDefault,
    reducers: {

        seenIt: (state, action: PayloadAction<LastSeenIt>) => {
            state.lastSeenItShow = action.payload
        },

    }
})

export const { seenIt } = seenItSlice.actions
