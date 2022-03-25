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
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    })
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
