import faker from 'faker'
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
]

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent().toISOString()
})
