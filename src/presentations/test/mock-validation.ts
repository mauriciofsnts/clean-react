import { Validation } from '@/presentations/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}
