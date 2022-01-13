type answer = {
  image?: string
  answer: string
}

export type SurveyModel = {
  id: string
  question: string
  answer: answer[]
  date: Date
  didAnswer: boolean
}
