import React from 'react'
import { Icon } from '@/presentations/components'
import { IconName } from '@/presentations/components/icon/icon'
import Styles from './survey-item-styles.scss'

type Props = {}

const SurveyList: React.FC<Props> = (props) => {
  return (
    <div className={Styles.surveyListWrapper}>
      <li>
        <div className={Styles.surveyContent}>
          <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
          <time>
            <span className={Styles.day}>22</span>
            <span className={Styles.month}>04</span>
            <span className={Styles.year}>2020</span>
          </time>

          <p>Qual é seu framework web favorito?</p>
        </div>

        <footer>Ver resultado</footer>
      </li>
    </div>
  )
}

export default SurveyList
