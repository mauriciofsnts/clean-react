import { HttpGetClient, HttpGetParams, HttpStatusCode, HttpResponse } from '@/data/protocols/http'

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    return this.response
  }
}
