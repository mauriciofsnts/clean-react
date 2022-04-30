export interface LoadSurveyResult {
  load: () => Promise<any>
}

export namespace LoadSurveyResult {
  type ResultAnswerModel = {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }

  export type Model = {
    question: string
    date: Date
    answers: ResultAnswerModel[]
  }
}
