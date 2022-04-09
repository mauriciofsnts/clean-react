import React from 'react'
import { Header } from '@/presentations/components'
import { fireEvent, render, screen } from '@testing-library/react'
import { ApiContext } from '@/presentations/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account
      }}
    >
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  )

  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  test('should call setCurrentAccount with null', () => {
    const { setCurrentAccountMock, history } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)

    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
