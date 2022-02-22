import { mockAccountModel } from './../../domain/test/mock-account'
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter/local-storage-adapter'

jest.mock('@/infra/cache/local-storage-adapter/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
