import faker from 'faker'
import { SurveyModel } from '../models'

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
]

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent()
})
