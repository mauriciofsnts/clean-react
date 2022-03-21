import React from 'react'
import { render } from '@testing-library/react'
import PrivateRouter from './private-route'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })

    render(
      <Router history={history}>
        <PrivateRouter />
      </Router>
    )
    expect(history.location.pathname).toBe('/login')
  })
})
