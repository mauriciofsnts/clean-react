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
})
