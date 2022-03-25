import React, { useEffect, useState } from 'react'
import Styles from './survey-list.scss'
import { Footer, Header } from '@/presentations/components'
import {
  SurveyItem,
  SurveyItemEmpty
} from '@/presentations/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prev) => ({ ...prev, surveys: surveys })))
      .catch((error) => setState((prev) => ({ ...prev, error: error.message })))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>

        {state.error ? (
          <div>
            <span data-testid="error">{state.error}</span>
            <button>Recarregar</button>
          </div>
        ) : (
          <ul data-testid="survey-list">
            {state.surveys.length ? (
              state.surveys.map((sv: SurveyModel) => (
                <SurveyItem key={sv.id} survey={sv} />
              ))
            ) : (
              <SurveyItemEmpty />
            )}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
