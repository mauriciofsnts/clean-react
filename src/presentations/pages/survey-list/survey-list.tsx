import React, { useEffect } from 'react'
import Styles from './survey-list.scss'
import { Footer, Header } from '@/presentations/components'
import { SurveyItemEmpty } from '@/presentations/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  useEffect(() => {
    async function load (): Promise<void> {
      await loadSurveyList.loadAll()
    }

    load()
  }, [])

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
