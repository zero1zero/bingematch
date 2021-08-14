import {createSlice} from "@reduxjs/toolkit";


export enum AuthStatus {
    Loading, Authenticated, Unauthenticated
}

export interface AuthState {
    status: AuthStatus
}

export const authStateDefault : AuthState = {
    status: AuthStatus.Loading
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authStateDefault,
    reducers: {
        login: state => {
            state.status = AuthStatus.Authenticated
        },

        logout: state => {
            state.status = AuthStatus.Unauthenticated
        }
    }
});
export const { login, logout } = authSlice.actions
