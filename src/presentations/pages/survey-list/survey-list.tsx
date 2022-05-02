import React, { useEffect, useState } from 'react'
import Styles from './survey-list.scss'
import { Footer, Header, Error } from '@/presentations/components'
import { List } from '@/presentations/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { useErrorHandler } from '@/presentations/pages/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((prev) => ({ ...prev, error: error.message }))
  })

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const reload = (): void =>
    setState((prev) => ({
      reload: !prev.reload,
      error: '',
      surveys: []
    }))

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prev) => ({ ...prev, surveys: surveys })))
      .catch((error) => handleError(error))
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>

        {state.error ? (
          <Error error={state.error} reload={reload} />
        ) : (
          <List surveys={state.surveys} />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
