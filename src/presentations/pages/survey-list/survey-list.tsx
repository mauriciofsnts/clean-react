import React from 'react'
import Styles from './survey-list.scss'
import { Footer, Header } from '@/presentations/components'
import { SurveyItemEmpty } from '@/presentations/pages/survey-list/components'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
