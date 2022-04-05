import { AccountModel } from '@/domain/models'

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AccountModel>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }

  export type Model = AccountModel
}
