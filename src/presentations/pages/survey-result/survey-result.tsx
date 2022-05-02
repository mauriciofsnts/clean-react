import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import FlipMove from 'react-flip-move'
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading
} from '@/presentations/components'
import { LoadSurveyResult } from '@/domain/usecases'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model[]
  })

  useEffect(() => {
    loadSurveyResult.load().then().catch()
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />

      <div data-testid="survey-result" className={Styles.contentWrap}>
        {false && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual é seu framework web favorito?</h2>
            </hgroup>

            <FlipMove className={Styles.answersList}>
              {state.surveyResult.map((a) => (
                <li key="0">
                  <img src="" />
                  <span className={Styles.answer}>React Js</span>
                  <span className={Styles.percent}>50%</span>
                </li>
              ))}
            </FlipMove>

            <button>Voltar</button>
          </>
        )}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => false} />}
      </div>

      <Footer />
    </div>
  )
}

export default SurveyResult
