import React from 'react'
import { InvalidCredentialsError } from '@/domain/errors'
import { Signup } from '@/presentations/pages'
import {
  Helper,
  UpdateCurrentAccountMock,
  ValidationSpy
} from '@/presentations/test'
import { AddAccountSpy } from '@/presentations/test/mock-add-account'
import {
  cleanup,
  render,
  fireEvent,
  waitFor,
  RenderResult
} from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  validationSpy.errorMessage = params?.validationError

  const addAccountSpy = new AddAccountSpy()

  const sut = render(
    <Router history={history}>
      <Signup
        validation={validationSpy}
        addAccount={addAccountSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )

  return {
    sut,
    addAccountSpy,
    updateCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Signup component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('should show name error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('should show valid name state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })
  test('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()

    const name = faker.random.word()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()

    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })

    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, updateCurrentAccountMock } = makeSut()

    await simulateValidSubmit(sut)

    expect(updateCurrentAccountMock.account).toEqual(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should present error if SaveAccessToken fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('should go to login page', () => {
    const { sut } = makeSut()

    const register = sut.getByTestId('login')
    fireEvent.click(register)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
