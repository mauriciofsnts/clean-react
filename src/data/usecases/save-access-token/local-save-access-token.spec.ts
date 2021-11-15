import faker from 'faker'
import { SetStorageSpy } from '@/data/test/mock-storage'
import { LocalSaveAccessToken } from './local-save-access-token'

interface SutTypes {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)

  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const access_token = faker.datatype.uuid()
    await sut.save(access_token)

    expect(setStorageSpy.key).toBe('access_token')
    expect(setStorageSpy.value).toBe(access_token)
  })
})
