import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentations/components'
import { FormContext } from '@/presentations/contexts'
import { Validation } from '@/presentations/protocols/validation'
import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
};

const Signup: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    errorMessage: '',
    mainError: ''
  })

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.password)
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>

          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />

          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar para login</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Signup
