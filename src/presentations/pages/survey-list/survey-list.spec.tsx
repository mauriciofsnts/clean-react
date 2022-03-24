import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentations/pages'

describe('SurveyList Component', () => {
  test('should present 4 empty item on start', () => {
    render(<SurveyList />)

    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
