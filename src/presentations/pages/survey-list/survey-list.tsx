import React from 'react'
import { Footer, Header, Icon } from '@/presentations/components'
import Styles from './survey-list.scss'
import { IconName } from '@/presentations/components/icon/icon'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul></ul>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
