import { LoadSurveyResult } from '@/domain/usecases'
import faker from 'faker'

export const mockSurveyResult = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: faker.datatype.boolean()
    },
    {
      answer: faker.random.word(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: faker.datatype.boolean()
    }
  ]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callscount = 0
  surveyResult = mockSurveyResult()

  async load (): Promise<LoadSurveyResult.Model> {
    await this.callscount++
    return this.surveyResult
  }
}
