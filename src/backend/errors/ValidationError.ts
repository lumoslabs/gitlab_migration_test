export enum ValidationRules {
  INCORRECT = 'incorrect',
  REQUIRED = 'required'
}
export default class ValidationError extends Error {
  constructor(field: string, message: string) {
    super(`Validation error ${field} - ${message}`)
  }
}
