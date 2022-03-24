import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentations/pages'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  // eslint-disable-next-line @typescript-eslint/require-await
  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return []
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()

  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty item on start', () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
