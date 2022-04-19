import * as Http from '../utils/http-mocks'
import * as FormHelper from '../utils/form-helper'

const path = /surveys/
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      FormHelper.setLocalStorageItem('account', account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')

    FormHelper.testUrl('login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')

    const { name } = FormHelper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('')

    cy.getByTestId('logout').click()

    FormHelper.testUrl('login')
  })
})
