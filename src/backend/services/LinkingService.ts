import LumosRailsApi from '@backend/libs/LumosRailsApi'
import getConfig from 'next/config'
import AuthService from './AuthService'


export default class LinkingService {
  api: LumosRailsApi
  authService: AuthService

  constructor() {
    this.api = new LumosRailsApi()
    this.authService = new AuthService()
  }

  linkExistingUserByToken = async (userId, token): Promise<string> => {
    const result = await this.api.loginByGoogleToken(token)
    if (!result?.access_token) {
      throw new Error('access_token is incorrect')
    }
    await this.authService.saveUser(userId, {
      lumosity_access_token: result?.access_token
    })
    return result.access_token
  }

  createNewUser = async (token): Promise<any> => {
    const accessToken = await this.api.getApiAccessToken()
    const user = await this.api.createAccountWithGoogleIdToken(accessToken.access_token, token)
    return user
  }
}
