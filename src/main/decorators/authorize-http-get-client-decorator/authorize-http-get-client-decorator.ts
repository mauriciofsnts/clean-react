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
    this.getStorage.get('account')
    await this.httpGetClient.get(params)
    return null
  }
}
