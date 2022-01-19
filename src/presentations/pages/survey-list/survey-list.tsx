import { Footer, Logo } from '@/presentations/components'
import React from 'react'
import Styles from './survey-list.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />

          <div className={Styles.logoutWrap}>
            <span>Mauricio</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>04</span>
                <span className={Styles.year}>2020</span>
              </time>

              <p>Qual é seu framework web favorito?</p>
            </div>

            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>04</span>
                <span className={Styles.year}>2020</span>
              </time>

              <p>Qual é seu framework web favorito?</p>
            </div>

            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>04</span>
                <span className={Styles.year}>2020</span>
              </time>

              <p>Qual é seu framework web favorito?</p>
            </div>

            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>04</span>
                <span className={Styles.year}>2020</span>
              </time>

              <p>Qual é seu framework web favorito?</p>
            </div>

            <footer>Ver resultado</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
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
