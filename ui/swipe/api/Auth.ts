import React from "react";

export enum AuthState {
    Loading, Authenticated, Unauthenticated
}

export interface AuthFunc {
    login: () => void
    signOut: () => void
}

export const AuthContext = React.createContext<AuthFunc>({login(): void {}, signOut(): void {}});
