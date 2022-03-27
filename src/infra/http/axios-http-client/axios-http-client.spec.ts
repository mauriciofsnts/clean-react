import axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockGetRequest, mockPostRequest } from '@/data/test'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('should call axios with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()

      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('should return correct response on axios.post', () => {
      const { sut, mockedAxios } = makeSut()

      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('should return correct error on axios.post', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('get', () => {
    test('should call axios.get with correct values', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()

      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { headers: request.headers })
    })

    test('should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('should return correct error on axios.get', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.post(mockGetRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
