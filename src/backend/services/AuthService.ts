import UserModel, { User } from '@backend/models/user'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export default class AuthService {

  async getUser(id: string): Promise<User | null> {
    const row = await UserModel.get({ id })
    if (!row?.Item)
      return null
    return row.Item as User
  }

  async tokenToUser(id: string) {
    return await this.getUser(id)
  }

  async userIdToToken(user: User): Promise<string> {
    return user.id
  }
}

