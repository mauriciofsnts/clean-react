import faker from 'faker'
import { SurveyModel } from '../models'

export const mockSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    answer: [
      { answer: faker.random.words(4), image: faker.internet.url() },
      { answer: faker.random.words(5), image: faker.internet.url() }
    ],
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent()
  }
]
