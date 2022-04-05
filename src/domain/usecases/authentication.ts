import { AccountModel } from '@/domain/models/account-model'

export interface Authentication {
  auth(params: Authentication.Params): Promise<Authentication.Model>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Model = AccountModel
}
