import React from 'react'
import { Footer, Header } from '@/presentations/components'
import Styles from './survey-list.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <div className={[Styles.iconWrap, Styles.green].join(' ')}>
                <img
                  className={Styles.icon}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA0klEQVQ4EWNgIAH8//+/AYhLSNCCWynUMCD1/zcQG+BWSYQMkmEgA0Egjght2JUANYO8iQ4MsasmIAo0BZthP4DirAS0YkrjMAzk0tOYqgmIADUVgnTiADPxakfStAWmECj2DkmcWOYjoEJPRpBqmEGMQABiI4vB5IikH1PbQAYmIm0mVtlLahu4nJpe/gf0hho1XbgVGKd3qWngRFBA4/LyX6AcKZZdBbpOB2QgLk1nQJIkgElwtaBEDAXIOUULKHYSiP/CJHHQX4Hic4CYBWYgADx8PyqFiuhJAAAAAElFTkSuQmCC"
                />
              </div>
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
