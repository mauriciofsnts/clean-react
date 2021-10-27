import React from 'react'
import Login from './login'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { ValidationSpy } from '@/presentations/test/'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()

  const sut = render(<Login validation={validationSpy}/>)

  return {
    sut,
    validationSpy
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const { sut, validationSpy } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('should show email error if validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('should show password error if validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should show valid email state if validation succeeds', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('should show valid password state if validation succeeds', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
