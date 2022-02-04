import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { LocalUpdateCurrentAccount } from '@/data/usecases/local-update-current-account/local-update-current-account'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
