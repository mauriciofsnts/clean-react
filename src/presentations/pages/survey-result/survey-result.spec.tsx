import React from 'react'
import { SurveyResult } from '@/presentations/pages'
import { render, screen } from '@testing-library/react'
import { ApiContext } from '@/presentations/contexts'
import { mockAccountModel } from '@/domain/test'

const makeSut = (): void => {
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <SurveyResult />
    </ApiContext.Provider>
  )
}

describe('SurveyResult Component', () => {
  test('should present correct initial state', () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')

    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
