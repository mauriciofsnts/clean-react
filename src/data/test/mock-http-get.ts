import { HttpGetClient, HttpGetParams } from '@/data/protocols/http'

export class HttpGetClientSpy implements HttpGetClient {
  url: string
  get (params: HttpGetParams): void {
    this.url = params.url
  }
}
