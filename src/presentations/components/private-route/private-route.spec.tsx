import React from 'react'
import { render } from '@testing-library/react'
import PrivateRouter from './private-route'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router history={history}>
      <PrivateRouter />
    </Router>
  )

  return { history }
}

describe('PrivateRoute', () => {
  const { history } = makeSut()

  test('should redirect to /login if token is empty', () => {
    expect(history.location.pathname).toBe('/login')
  })
})
