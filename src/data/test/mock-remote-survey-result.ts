import faker from 'faker'
import { RemoteLoadSurveyResult } from './../usecases/load-survey-result/remote-load-survey-result'

export const mockRemoteSurveyResultModel =
  (): RemoteLoadSurveyResult.Model => ({
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(10),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: faker.datatype.boolean()
      },
      {
        answer: faker.random.words(10),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: faker.datatype.boolean()
      }
    ]
  })
