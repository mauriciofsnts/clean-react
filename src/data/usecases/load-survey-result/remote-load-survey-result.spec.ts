import { HttpGetClientSpy } from './../../test/mock-http-client'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'
import faker from 'faker'

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()

    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
    await sut.load()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
