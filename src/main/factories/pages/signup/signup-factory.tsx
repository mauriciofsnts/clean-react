import React from 'react'
import { Signup } from '@/presentations/pages'
import { makeSignupValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/add-account-factory'

export const makeSignup: React.FC = () => {
  return (
    <React.Fragment>
      <Signup
        addAccount={makeRemoteAddAccount()}
        validation={makeSignupValidation()}
      />
    </React.Fragment>
  )
}
