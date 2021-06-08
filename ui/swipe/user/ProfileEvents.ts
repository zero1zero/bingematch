import _ from 'lodash';
import {emailCheck, passwordCheck, shouldValidate, verifyCheck} from "../onboard/UserReducer";

export enum ValidationStatus {
    Input, Verify, Valid, Invalid
}

export interface Validation {
    status?: ValidationStatus
    message?: string
}

export interface InputState {
    validation?: Validation
    value?: string
}

export interface StateChange {
    email?: InputState
    password?: InputState
    verify?: InputState
    submit?: boolean
}

export interface UserState {
    email: InputState
    password: InputState
    verify: InputState
    submit?: boolean
}

export type Reducer = (state: UserState, change: StateChange) => UserState
export const reducer = (state: UserState, change: StateChange): UserState => {
    state = _.merge({}, state, change)

    if (state.email && shouldValidate(state.email.validation.status)) {
        state.email = _.merge({}, state.email, emailCheck(state.email))
    }

    if (state.password && shouldValidate(state.password.validation.status)) {
        state.password = _.merge({}, state.password, passwordCheck(state.password))
    }

    if (state.verify && shouldValidate(state.verify.validation.status)) {
        state = _.merge({}, state, verifyCheck(state))
    }

    if (change.submit != undefined) {
        state.submit = change.submit
    }

    return state
}
