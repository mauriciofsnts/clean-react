import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { Signup } from '@/presentations/pages'
import '@/presentations/styles/global.scss'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
