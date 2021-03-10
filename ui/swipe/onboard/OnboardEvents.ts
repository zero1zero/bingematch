import _ from 'lodash';

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

export interface OnboardState {
    email: InputState
    password: InputState
    verify: InputState
    submit?: boolean
}

export type Reducer = (state : OnboardState, change : StateChange) => OnboardState
export const reducer = (state : OnboardState, change : StateChange) : OnboardState => {

    if (change.email) {
        state.email = _.merge({}, state.email, change.email)
    }

    if (change.password) {
        state.password = _.merge({}, state.password, change.password)
    }

    if (change.verify) {
        state.verify = _.merge({}, state.verify, change.verify)
    }

    if (change.submit != undefined) {
        state.submit = change.submit
    }

    return _.merge({}, state)
}
