import React, { useState } from 'react'
import FlipMove from 'react-flip-move'
import { Footer, Header, Spinner } from '@/presentations/components'
import Styles from './survey-result-styles.scss'

type Props = {}

const SurveyResult: React.FC<Props> = () => {
  const [anwsers] = useState([
    {
      image: 'http://fordevs.herokuapp.com/static/img/logo-react.png',
      anwser: 'ReactJS',
      percent: 50,
      isCurrentAccountAnswer: true
    },
    {
      image: 'http://fordevs.herokuapp.com/static/img/logo-vue.png',
      anwser: 'VueJS',
      percent: 30,
      isCurrentAccountAnswer: false
    },
    {
      image: 'http://fordevs.herokuapp.com/static/img/logo-angular.png',
      anwser: 'Angular',
      percent: 20,
      isCurrentAccountAnswer: false
    }
  ])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>

        <FlipMove className={Styles.answersList}>
          {anwsers.map((a) => (
            <li key={a.anwser}>
              <img src={a.image} />
              <span className={Styles.answer}>{a.anwser}</span>
              <span className={Styles.percent}>{a.percent}%</span>
            </li>
          ))}
        </FlipMove>

        <button>Voltar</button>

        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative/>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyResult
