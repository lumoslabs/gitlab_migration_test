export default class ValidationError extends Error {
  constructor(field: string, message: string) {
    super(`Validation error ${field} - ${message}`)
  }
}
