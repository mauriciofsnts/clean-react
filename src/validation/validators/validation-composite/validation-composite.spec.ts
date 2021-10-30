import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]

  const sut = new ValidationComposite(fieldValidationSpy)

  return {
    sut,
    fieldValidationSpy
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const { sut, fieldValidationSpy } = makeSut()

    fieldValidationSpy[0].error = new Error('first_error_message')
    fieldValidationSpy[1].error = new Error('second_error_message')

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
