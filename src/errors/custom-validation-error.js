export class CustomValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Validation Error'
    Error.captureStackTrace(this, CustomValidationError)
  }
}
