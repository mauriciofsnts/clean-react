import React, { useEffect, useState } from 'react'
import Styles from './survey-list.scss'
import { Footer, Header } from '@/presentations/components'
import {
  List,
  Context,
  Error
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

        <Context.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <List />}
        </Context.Provider>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
