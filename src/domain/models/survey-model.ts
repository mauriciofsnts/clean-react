export type AnswerModel = {
  image?: string
  answer: string
}

export type SurveyModel = {
  id: string
  question: string
  answer: AnswerModel[]
  date: Date
  didAnswer: boolean
}
