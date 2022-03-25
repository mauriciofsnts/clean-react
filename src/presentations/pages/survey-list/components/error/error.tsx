import React, { useContext } from 'react'
import Styles from './error-styles.scss'

import { Context } from '@/presentations/pages/survey-list/components'

type Props = {}

const Error: React.FC<Props> = (props) => {
  const { state } = useContext(Context)

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
