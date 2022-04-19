import * as FormHelper from '../utils/form-helper'

describe('Login', () => {
  it('should logout if survey-list has no token', () => {
    cy.visit('')
    FormHelper.testUrl('login')
  })
})
