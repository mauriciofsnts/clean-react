import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentations/components'
import { FormContext } from '@/presentations/contexts'
import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'

const Signup: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state: {} }}>
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

          <button className={Styles.submit} type="submit">
            Entrar
          </button>
          <Link to="/login" className={Styles.link}>
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
