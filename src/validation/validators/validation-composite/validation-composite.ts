import { FieldValidation } from '@/validation/protocols/field-validation'
import { Validation } from '@/presentations/protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: FieldValidation[]) {}

  validate (fieldName: string, input: object): string {
    const validators = this.validators.filter(v => v.field === fieldName)

    for (const validator of validators) {
      const error = validator.validate(input)

      if (error) {
        return error.message
      }
    }
  }
}
