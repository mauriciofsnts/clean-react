import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'

import { makeSignupValidation } from './signup-validation-factory'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'

describe('SignupValidationFactory', () => {
  test('should make compose ValidationComposite with correct validation', () => {
    const composite = makeSignupValidation()

    expect(composite).toEqual(
      new ValidationComposite([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 5),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('passwordConfirmation', 'password')
      ])
    )
  })
})
