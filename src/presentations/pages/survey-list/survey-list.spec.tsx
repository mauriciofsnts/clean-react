import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentations/pages'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  // eslint-disable-next-line @typescript-eslint/require-await
  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const loadSurveyListSpy = new LoadSurveyListSpy()

  render(
    <Router history={history}>
      <SurveyList loadSurveyList={loadSurveyListSpy} />
    </Router>
  )

  return {
    loadSurveyListSpy,
    history
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty item on start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveyList)
  })

  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('should render SurveyList on success', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)

    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(1)
  })
})
