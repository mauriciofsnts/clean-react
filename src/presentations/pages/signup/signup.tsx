import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentations/components'
import { FormContext } from '@/presentations/contexts'
import React, { useState } from 'react'
import Styles from './signup-styles.scss'

const Signup: React.FC = () => {
  const [state] = useState({
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório'
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state }}>
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
