import faker from 'faker'
import { SetStorageMock } from '@/data/test/mock-storage'
import { LocalSaveAccessToken } from './local-save-access-token'

interface SutTypes {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const access_token = faker.datatype.uuid()
    await sut.save(access_token)

    expect(setStorageMock.key).toBe('access_token')
    expect(setStorageMock.value).toBe(access_token)
  })

  test('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())

    const promise = sut.save(faker.datatype.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })
})
