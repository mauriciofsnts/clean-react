import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentations/pages'
import { LoadSurveyList } from '@/domain/usecases'
import { mockAccountModel, mockSurveyListModel } from '@/domain/test'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentations/contexts'
import { AccountModel } from '@/domain/models'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  // eslint-disable-next-line @typescript-eslint/require-await
  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadSurveyListSpy,
    setCurrentAccountMock,
    history
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty item on start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
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

    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)

    makeSut(loadSurveyListSpy)

    await waitFor(() => screen.getByRole('heading'))

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()

    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError())

    const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy)

    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyListSpy.callsCount).toBe(1)

    await waitFor(() => screen.getByRole('heading'))
  })
})
