import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentations/components'

import { FormContext } from '@/presentations/contexts'
import { Validation } from '@/presentations/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    email: '',
    emailError: 'Campo obrigatório',
    password: '',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState(prev => ({ ...prev, emailError: validation.validate('email', state.email) }))
  }, [state.email])

  useEffect(() => {
    setState(prev => ({ ...prev, passwordError: validation.validate('password', state.password) }))
  }, [state.password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (state.isLoading) return

    setState(prev => ({ ...prev, isLoading: true }))
    await authentication.auth({ email: state.email, password: state.password })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu email" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            disabled={!!state.emailError || !!state.passwordError}
            data-testid="submit"
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
