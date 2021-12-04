import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentations/components'
import { FormContext } from '@/presentations/contexts'
import { Validation } from '@/presentations/protocols/validation'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
};

const Signup: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken
}) => {
  const history = useHistory()
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
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.password
      )
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    try {
      if (
        state.isLoading ||
        state.nameError ||
        state.emailError ||
        state.passwordConfirmationError ||
        state.passwordError
      ) {
        return
      }

      setState((prev) => ({
        ...prev,
        isLoading: true
      }))

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      await saveAccessToken.save(account.accessToken)

      history.replace('/')
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          data-testid="form"
          onSubmit={handleSubmit}
        >
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
            disabled={
              !!state.emailError ||
              !!state.passwordError ||
              !!state.nameError ||
              !!state.passwordConfirmationError
            }
            data-testid="submit"
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>

          <Link data-testid="login" to="/login" className={Styles.link} replace>
            Voltar para login
          </Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Signup
