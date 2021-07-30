import UserModel, { User } from '@backend/models/user'
import getConfig from 'next/config'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const { serverRuntimeConfig } = getConfig()


export interface TokenPayload {
  id: string
}

export default class AuthService {

  async getUser(id: string): Promise<User | null> {
    const row = await UserModel.get({ id })
    if (!row?.Item)
      return null
    return row.Item as User
  }

  async createNewUser() {
    const id = uuidv4()
    const user: User = {
      id
    }
    await UserModel.put(user)
    return user
  }

  async saveUser(id: string, data: Partial<User>): Promise<string> {
    await UserModel.update({
      id,
      ...data
    })
    return id
  }


  parseToken(token: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, serverRuntimeConfig.jwt.secret, function (err, decoded) {
        if (err) {
          resolve(null)
        } else {
          resolve(decoded)
        }
      })
    })
  }

  generateToken(user: User): Promise<string> {
    const payload: TokenPayload = {
      id: user.id
    }
    return new Promise((resolve, reject) => {
      jwt.sign(payload, serverRuntimeConfig.jwt.secret, {
        expiresIn: serverRuntimeConfig.jwt.expiresIn
      }, (err, token) => {
        if (err)
          reject(err)
        else
          resolve(token)
      })
    })
  }
}


