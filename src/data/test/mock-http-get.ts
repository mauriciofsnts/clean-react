import faker from 'faker'
import { HttpGetParams } from '@/data/protocols/http/'

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
})
