import { HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<void> {
    return await this.httpGetClient.get({ url: this.url })
  }
}
