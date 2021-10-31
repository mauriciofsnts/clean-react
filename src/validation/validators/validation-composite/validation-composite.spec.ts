import faker from 'faker'
import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = new ValidationComposite(fieldValidationSpy)

  return {
    sut,
    fieldValidationSpy
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(fieldName)

    const erorMessage = faker.random.words()

    fieldValidationSpy[0].error = new Error(erorMessage)
    fieldValidationSpy[1].error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(erorMessage)
  })

  test('should return falsy if there is no error', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
