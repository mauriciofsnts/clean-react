import { Signup } from '@/presentations/pages'
import { Helper, ValidationSpy } from '@/presentations/test'
import {
  cleanup, render,
  RenderResult
} from '@testing-library/react'
import faker from 'faker'
import React from 'react'

type SutTypes = {
  sut: RenderResult
};

type SutParams = {
  validationError: string
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError

  const sut = render(<Signup validation={validationSpy} />)

  return {
    sut
  }
}

describe('Signup component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('should show name error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
