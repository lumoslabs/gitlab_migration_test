import axios, { AxiosInstance } from 'axios'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export default class LumosRailsApi {
  clientSecret: string
  clientId: string
  axios: AxiosInstance

  constructor() {
    this.clientId = serverRuntimeConfig.rails.clientId
    this.clientSecret = serverRuntimeConfig.rails.clientSecret
    this.axios = axios.create({
      baseURL: serverRuntimeConfig.rails.url,
      headers: {
        Accept: 'application/json'
      }
    })
  }

  loginByGoogleToken = async (token: string): Promise<{ access_token: string, scope: 'user' | string }> => {
    const uri = 'api/oauth/token'
    const params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      auth_type: 'google',
      grant_type: 'password',
      password: '',
      username: '',
      id_token: token
    }
    const response = await this.axios.post(uri, params)
    return response.data
  }


  getApiAccessToken = async (): Promise<{
    access_token: string,
    scope: 'confidential_client' | string
  }> => {
    const uri = 'api/oauth/token'
    const params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'client_credentials'
    }

    const response = await this.axios.post(uri, params)
    return response.data
  }

  createAccountWithGoogleIdToken = async (confidentialToken: string, userToken: string) => {
    const uri = 'api/v2/users'
    const params = {
      user: {
        auth_type: 'google',
        id_token: userToken,
      }
    }
    const response = await this.axios.post(uri, params, {
      headers: {
        Authorization: `OAuth ${confidentialToken}`
      }
    })
    return response.data
  }

  // https://www.lumosity.com/api_v2/docs/v2/game_results/create.html
  saveGameResult = async (accessToken: string, gameSlug: string, gameResult: any) => {
    const uri = 'api/v2/game_results'
    const response = await this.axios.post(uri, {
      game_result: {
        game_url_slug: gameSlug,
        ...gameResult,
      }
    }, {
      headers: { Authorization: `OAuth ${accessToken}` }
    })
    return response.data
  }

  updateUserInfo = async (id: string, accessToken: string, { birthday }: { birthday: string }) => {
    const uri = `api/v2/users/${id}`
    const response = await this.axios.put(uri, {
      user: {
        date_of_birth: birthday
      }
    }, {
      headers: { Authorization: `OAuth ${accessToken}` }
    })
    return response.data
  }

}
