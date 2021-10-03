import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from '@/presentations/pages'

import '@/presentations/styles/global.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
