import { GetStorage } from '@/data/protocols/cache'
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse
} from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClientSpy
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    const account = await this.getStorage.get('account')

    if (account?.accessToken) {
      params.headers = {
        ...params.headers,
        'x-access-token': account.accessToken
      }
    }

    const httpResponse = await this.httpGetClient.get(params)
    return httpResponse
  }
}
