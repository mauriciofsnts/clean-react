import { AccountModel } from 'domain/models/accountModel'

export interface AuthenticationParams {
  email: string
  password: string
}

export interface Authentication {
  auth (params: AuthenticationParams): Promise<AccountModel>
}
