import React, { useContext } from 'react'
import Styles from './error-styles.scss'

import { Context } from '@/presentations/pages/survey-list/components'

type Props = {}

const Error: React.FC<Props> = (props) => {
  const { state, setState } = useContext(Context)

  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>
        Tentar novamente
      </button>
    </div>
  )
}

export default Error
