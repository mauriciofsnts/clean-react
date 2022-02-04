import React from 'react'
import { Signup } from '@/presentations/pages'
import { makeSignupValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/add-account-factory'
import { makeLocalUpdateCurrentAccount } from '../../usecases/update-current-account/local-update-current-account-factory'

export const makeSignup: React.FC = () => {
  return (
    <React.Fragment>
      <Signup
        addAccount={makeRemoteAddAccount()}
        validation={makeSignupValidation()}
        updateCurrentAccount={makeLocalUpdateCurrentAccount()}
      />
    </React.Fragment>
  )
}
