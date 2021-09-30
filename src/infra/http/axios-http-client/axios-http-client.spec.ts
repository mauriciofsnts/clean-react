import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct url', async () => {
    const url = faker.internet.url()
    const sut = makeSut()

    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
