import faker from 'faker'
import * as Helper from './http-mocks'

export const mockEmailInUseError = (): void => Helper.mockForbiddenError(/signup/, 'POST')
export const mockUnexpectedError = (): void => Helper.mockServerError(/signup/, 'POST')
export const mockOk = (): void => Helper.mockOk(/signup/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.findName() })
