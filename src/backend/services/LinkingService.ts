import LumosRailsApi from '@backend/libs/LumosRailsApi'

export default class LinkingService {
  api: LumosRailsApi

  constructor() {
    this.api = new LumosRailsApi()
  }

  getUserAccessTokenById = async (userId: string, token: string): Promise<string> => {
    const result = await this.api.loginByGoogleToken(token)
    if (!result?.access_token) {
      throw new Error('access_token is incorrect')
    }
    return result?.access_token
  }

  createNewUser = async (token: string): Promise<{ id: string }> => {
    const accessToken = await this.api.getApiAccessToken()
    const { user } = await this.api.createAccountWithGoogleIdToken(accessToken.access_token, token)
    return user
  }

  getUserId = async (token: string): Promise<any> => {
    const data = await this.api.getUserInfo(token)
    return data.user.id
  }

  setUserBirthday = async (userId: string, token: string, birthday: string): Promise<any> => {
    const { user } = await this.api.updateUserInfo(userId, token, { birthday })
    return user
  }
}
