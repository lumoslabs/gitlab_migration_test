import LumosRailsApi from '@backend/libs/LumosRailsApi'
import AuthService from './AuthService'


export default class LinkingService {
  api: LumosRailsApi
  authService: AuthService

  constructor() {
    this.api = new LumosRailsApi()
    this.authService = new AuthService()
  }

  linkExistingUserByToken = async (userId: string, token: string): Promise<string> => {
    const result = await this.api.loginByGoogleToken(token)
    if (!result?.access_token) {
      throw new Error('access_token is incorrect')
    }
    await this.authService.saveUser(userId, {
      lumosity_access_token: result?.access_token
    })

    return result?.access_token
  }

  createNewUser = async (token: string): Promise<{ id: string }> => {
    const accessToken = await this.api.getApiAccessToken()
    const { user } = await this.api.createAccountWithGoogleIdToken(accessToken.access_token, token)
    return user
  }

  setUserBirthday = async (userId: string, token: string, birthday: string): Promise<any> => {
    const { user } = await this.api.updateUserInfo(userId, token, { birthday })
    return user
  }
}
