import * as Helper from './http-mocks'
import faker from 'faker'

export const mockInvalidCredentialsError = (): void => Helper.mockUnauthorizedError(/login/)
export const mockUnexpectedError = (): void => Helper.mockServerError(/login/, 'POST')
export const mockOk = (): void => Helper.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
