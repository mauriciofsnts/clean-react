import React from 'react'
import Spinner from '../spinner/spinner'
import Styles from './loading-styles.scss'

type Props = {}

const Loading: React.FC<Props> = () => {
  return (
    <div className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export default Loading
