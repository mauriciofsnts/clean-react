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
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.iconWrap} iconName={IconName.thumbUp}/>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>04</span>
                <span className={Styles.year}>2020</span>
              </time>

              <p>Qual é seu framework web favorito?</p>
            </div>

            <footer>Ver resultado</footer>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
