import _ from 'lodash';
import {
    emailCheck,
    firstCheck,
    InputState,
    lastCheck,
    passwordCheck,
    shouldValidate,
    verifyCheck
} from "../onboard/SignUpReducer";

export interface StateChange {
    email?: InputState
    first?: InputState
    last?: InputState
    password?: InputState
    verify?: InputState
    submit?: boolean
}

export interface UserState {
    email: InputState
    first: InputState
    last: InputState
    password: InputState
    verify: InputState
    submit?: boolean
}

export type ProfileReducer = (state: UserState, change: StateChange) => UserState
export const profileReducer = (state: UserState, change: StateChange): UserState => {
    state = _.merge({}, state, change)

    if (state.email && shouldValidate(state.email.validation.status)) {
        state.email = _.merge({}, state.email, emailCheck(state.email))
    }

    if (state.first && shouldValidate(state.first.validation.status)) {
        state.first = _.merge({}, state.first, firstCheck(state.first))
    }

    if (state.last && shouldValidate(state.last.validation.status)) {
        state.last = _.merge({}, state.last, lastCheck(state.last))
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
