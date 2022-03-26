import React from 'react'
import { SurveyList } from '@/presentations/pages'
import { makeRemoteLoadSurveyList } from '@/main/factories/usecases/load-survey-list/remote-load-survey-list-factory'

export const makeSurveyList: React.FC = () => {
  return (
    <React.Fragment>
      <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
    </React.Fragment>
  )
}
