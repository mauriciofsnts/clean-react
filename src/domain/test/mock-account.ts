import faker from 'faker'
import { Authentication } from '@/domain/usecases'
import { AccountModel } from '../models/account-model'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})
