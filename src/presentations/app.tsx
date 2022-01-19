import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/signup-factory'
import '@/presentations/styles/global.scss'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { SurveyList } from './pages'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignup} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
