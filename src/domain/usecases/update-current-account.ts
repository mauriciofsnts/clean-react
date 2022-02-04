import { AccountModel } from '../models'

export interface UpdateCurrentAccount {
  save: (accountModel: AccountModel) => Promise<void>
}
