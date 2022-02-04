import React from 'react'
import { Login } from '@/presentations/pages'

import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { makeLocalUpdateCurrentAccount } from '../../usecases/update-current-account/local-update-current-account-factory'

export const makeLogin: React.FC = () => {
  return (
    <React.Fragment>
      <Login
        authentication={makeRemoteAuthentication()}
        validation={makeLoginValidation()}
        updateCurrentAccount={makeLocalUpdateCurrentAccount()}
      />
    </React.Fragment>
  )
}
