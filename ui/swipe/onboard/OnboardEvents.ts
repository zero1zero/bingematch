export enum ValidationStatus {
    Unknown, Valid, Invalid
}
interface InputState {
    validation: ValidationStatus
    value: string
}
