import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.words(3),
      [fieldToCompare]: faker.random.words(4)
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const value = faker.random.word()
    const field = value
    const fieldToCompare = value
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
