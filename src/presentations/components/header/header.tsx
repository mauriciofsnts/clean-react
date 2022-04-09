import React, { memo, useContext } from 'react'
import Styles from './header.styles.scss'
import { Logo } from '@/presentations/components'
import { ApiContext } from '@/presentations/contexts'
import { useLogout } from '@/presentations/pages/hooks/use-logout'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)

  const logoutButtonClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    e.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />

        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={logoutButtonClick} href="#">
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
