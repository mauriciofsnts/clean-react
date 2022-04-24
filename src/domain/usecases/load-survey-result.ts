export interface LoadSurveyResult {
  load: () => Promise<any>
}

export namespace LoadSurveyResult {
  type ResultAnswerModel = {
    image?: string
    answer: string
    count: number
    percent: number
  }

  export type Model = {
    question: string
    date: Date
    answers: ResultAnswerModel[]
  }
}
