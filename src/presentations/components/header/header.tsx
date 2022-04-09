import React, { memo, useContext } from 'react'
import Styles from './header.styles.scss'
import { Logo } from '@/presentations/components'
import { ApiContext } from '@/presentations/contexts'
import { useHistory } from 'react-router-dom'

const Header: React.FC = () => {
  const history = useHistory()
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)

  const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />

        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={logout} href="#">
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
