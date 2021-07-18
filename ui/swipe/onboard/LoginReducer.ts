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
    submit?: boolean
}

export interface OnboardState {
    email: InputState
    password: InputState
    submit?: boolean
}

const emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

export type LoginEvents = (state: OnboardState, change: StateChange) => OnboardState
export const loginReduder = (state: OnboardState, change: StateChange): OnboardState => {
    state = _.merge({}, state, change)

    if (state.email && shouldValidate(state.email.validation.status)) {
        state.email = _.merge({}, state.email, emailCheck(state.email))
    }

    if (state.password && shouldValidate(state.password.validation.status)) {
        state.password = _.merge({}, state.password, passwordCheck(state.password))
    }

    if (change.submit != undefined) {
        state.submit = change.submit
    }

    return state
}

export const shouldValidate = (status: ValidationStatus) => {
    return status == ValidationStatus.Verify || status == ValidationStatus.Invalid
}

const valid = {validation: {status: ValidationStatus.Valid, message: ''}}
const invalid = (message): InputState => {
    return {
        validation: {
            status: ValidationStatus.Invalid,
            message: message
        }
    }
}

const stateToValidations = (state : OnboardState) => {
    return [state.email.validation,
        state.password.validation]
}

export const isReadyToValidate = (state : OnboardState) => {
    return stateToValidations(state).filter(validation => {
        return validation.status == ValidationStatus.Input
            || validation.status == ValidationStatus.Verify
    }).length == 0
}

export const isValid = (state : OnboardState) => {
    const validations = stateToValidations(state)
    return validations.filter(validation => validation.status == ValidationStatus.Valid).length == validations.length
}

export const verify = {validation: {status: ValidationStatus.Verify}}
export const input = {validation: {status: ValidationStatus.Verify}}

export const emailCheck = (state: InputState): InputState => {
    if (!state.value || !emailRegex.test(state.value)) {
        return invalid('Please enter a valid email')
    }

    return valid
}

export const passwordCheck = (state: InputState): InputState => {

    //verify or not, we need a value
    if (!state.value) {
        return invalid('Please enter your password')
    }

    return valid
}

export const defaultReducer = {
    email: input,
    password: input,
}
