export type AnswerModel = {
  image?: string
  answer: string
}

export type SurveyModel = {
  id: string
  question: string
  date: Date
  didAnswer: boolean
}
