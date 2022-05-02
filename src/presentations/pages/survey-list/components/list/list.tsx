import React from 'react'
import Styles from './list-styles.scss'
import { Item, ItemEmpty } from '@/presentations/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((sv: LoadSurveyList.Model) => (
          <Item key={sv.id} survey={sv} />
        ))
      ) : (
        <ItemEmpty />
      )}
    </ul>
  )
}

export default List
