import React from 'react'
import { render, screen } from '@testing-library/react'
import { Item as SurveyItem } from '@/presentations/pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'
import { createMemoryHistory } from 'history'
import { IconName } from '@/presentations/components'
import { Router } from 'react-router-dom'

const makeSut = (survey = mockSurveyModel()): void => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  )
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
