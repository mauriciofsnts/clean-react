import { HttpGetClient, HttpGetParams, HttpPostClient, HttpResponse } from '@/data/protocols/http'
import { HttpPostParams } from '@/data/protocols/http/http-post-client'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post (params: HttpPostParams): Promise<HttpResponse> {
    let axiosReponse: AxiosResponse
    try {
      axiosReponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosReponse = error.response
    }

    return {
      statusCode: axiosReponse.status,
      body: axiosReponse.data
    }
  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    let axiosReponse: AxiosResponse

    try {
      axiosReponse = await axios.get(params.url)
    } catch (error) {
      axiosReponse = error.response
    }

    return {
      statusCode: axiosReponse.status,
      body: axiosReponse.data
    }
  }
}
