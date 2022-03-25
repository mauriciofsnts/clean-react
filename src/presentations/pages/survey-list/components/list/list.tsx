import React, { useContext } from 'react'
import Styles from './survey-list.scss'
import { SurveyModel } from '@/domain/models'

import {
  Context,
  Item,
  ItemEmpty
} from '@/presentations/pages/survey-list/components'

type Props = {}

const List: React.FC = (props: Props) => {
  const { state } = useContext(Context)

  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((sv: SurveyModel) => <Item key={sv.id} survey={sv} />)
      ) : (
        <ItemEmpty />
      )}
    </ul>
  )
}

export default List
