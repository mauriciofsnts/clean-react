import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentations/components/spinner/spinner'
import LoginHeader from '@/presentations/components/login-header/login-header'
import Footer from '@/presentations/components/footer/footer'
import Input from '@/presentations/components/input/input'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu email" />

        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>

      <Footer />
    </div>
  )
}

export default Login
