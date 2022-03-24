import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentations/pages'

const makeSut = (): void => {
  render(<SurveyList />)
}

describe('SurveyList Component', () => {
  test('should present 4 empty item on start', () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
