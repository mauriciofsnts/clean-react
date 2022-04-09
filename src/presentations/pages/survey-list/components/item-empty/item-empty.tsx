import React from 'react'
import Styles from './item-empty-styles.scss'

type Props = {}

const SurveyListEmpty: React.FC<Props> = (props) => {
  return (
    <>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
      <li className={Styles.surveyItemEmpty}></li>
    </>
  )
}

export default SurveyListEmpty
