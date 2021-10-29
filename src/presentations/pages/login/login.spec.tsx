import React from 'react'
import Login from './login'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import { ValidationSpy, AuthenticationSpy } from '@/presentations/test/'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
};

type SutParams = {
  validationError: string
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()

  validationSpy.errorMessage = params?.validationError

  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  )

  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populatePasswordField(sut, password)
  populateEmailField(sut, email)

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)

  expect(emailStatus.title).toBe(validationError || 'Tudo certo')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  test('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    simulateStatusForField(sut, 'password')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    populateEmailField(sut)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
})
