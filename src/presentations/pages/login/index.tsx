import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentations/components/spinner/spinner'
import LoginHeader from '@/presentations/components/login-header/login-header'
import Footer from '@/presentations/components/footer/footer'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader/>

      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu email" />
          <span className={Styles.status}>*</span>
        </div>

        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite sua senha"/>
          <span className={Styles.status}>*</span>
        </div>

        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>

      <Footer/>
    </div>
  )
}

export default Login
