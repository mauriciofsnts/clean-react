import faker from 'faker'
import * as Http from '../support/survey-list-mocks'
import * as FormHelper from '../support/form-helper'

describe('SurveyList', () => {
  beforeEach(() => {
    FormHelper.setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: faker.name.findName()
    })
  })

  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })

  it('should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()
    cy.visit('')

    FormHelper.testUrl('login')
  })

  it('should presenet correct username', () => {
    Http.mockUnexpectedError()
    cy.visit('')

    const { name } = FormHelper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on logout link click', () => {
    Http.mockUnexpectedError()
    cy.visit('')

    cy.getByTestId('logout').click()

    FormHelper.testUrl('login')
  })
})
