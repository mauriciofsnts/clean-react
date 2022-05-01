import React, { useState } from 'react'
import FlipMove from 'react-flip-move'
import { Calendar, Footer, Header, Loading } from '@/presentations/components'
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
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWrap} />
          <h2>Qual é seu framework web favorito?</h2>
        </hgroup>

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

        <Loading />
      </div>

      <Footer />
    </div>
  )
}

export default SurveyResult
