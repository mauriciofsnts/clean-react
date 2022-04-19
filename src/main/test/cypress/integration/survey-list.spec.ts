import * as Http from '../utils/http-mocks'
import * as FormHelper from '../utils/form-helper'

const path = /surveys/
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
export const mockAccessDeniedError = (): void =>
  Http.mockForbiddenError(path, 'GET')
export const mockSuccess = (): void =>
  Http.mockOk(path, 'GET', 'fx:survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
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

  it('should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('')

    mockSuccess()
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
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

  it('should present survey items', () => {
    mockSuccess()
    cy.visit('')

    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2018')
      assert.equal(
        li.find('[data-testid="question"]').text(),
        'What is the name of the main character in the first season of the show?'
      )

      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })

    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '04')
      assert.equal(li.find('[data-testid="month"]').text(), 'abr')
      assert.equal(li.find('[data-testid="year"]').text(), '2017')
      assert.equal(
        li.find('[data-testid="question"]').text(),
        'What is the name of the main character in the second season of the show?'
      )

      cy.fixture('icons').then((icon) => {
        assert.equal(
          li.find('[data-testid="icon"]').attr('src'),
          icon.thumbDown
        )
      })
    })
  })
})
