import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter/local-storage-adapter'
import { mockAccountModel } from '@/domain/test'

jest.mock('@/infra/cache/local-storage-adapter/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('should call LocalStorageAdapter.get with correct values', () => {
    const fakeAccount = mockAccountModel()
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(fakeAccount)

    const account = getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
    expect(fakeAccount).toEqual(account)
  })
})
