import { AccountModel } from 'domain/models/accountModel'

interface AuthenticationParams {
  email: string
  password: string
}

export interface Authentication {
  auth (params: AuthenticationParams): Promise<AccountModel>
}
