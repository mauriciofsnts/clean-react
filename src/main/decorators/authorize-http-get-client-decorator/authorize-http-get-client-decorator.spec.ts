import { HttpGetParams } from '@/data/protocols/http'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  )
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()

    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.word()
      }
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('should add headers if GetStorage is valid', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()

    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      ...httpRequest.headers,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('shout merge headers if GetStorage is valid', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()

    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.word()
      }
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      ...httpRequest.headers,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('should call HttpGetClient with correct values', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual(httpGetClientSpy.response)
  })
})
