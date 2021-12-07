import { makeSignupValidation } from './signup-validation-factory'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'
import { ValidationComposite } from '../../../../validation/validators/validation-composite/validation-composite'

describe('SignupValidationFactory', () => {
  test('should make compose ValidationComposite with correct validation', () => {
    const composite = makeSignupValidation()

    expect(composite).toEqual(
      new ValidationComposite([
        ...Builder.field('name').required().min(5).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build(),
        ...Builder.field('passwordConfirmation').required().sameAs('password').build()
      ])
    )
  })
})
