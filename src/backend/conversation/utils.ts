import { Canvas, ConversationV3 } from 'actions-on-google'
import { ExpectedPhrase, VerificationStatus } from 'actions-on-google/dist/api/schema'
//import appSharedActions from '@store/slices/appSharedActions'
import getConfig from 'next/config'
import CryptoJS from 'crypto-js'

const { serverRuntimeConfig } = getConfig()

export enum Scenes {
  InitialScene = 'InitialScene',
  Main = 'MainScene',
  AgeGate = 'AgeGate',
  AccountLinkingOrigin = 'AccountLinkingOrigin',
  AccountLinkingOriginAccountLinking = 'AccountLinkingOrigin_AccountLinking', //TODO: rename to normal name
  EndConversation = 'EndConversation',
}

export enum Pages {
  Home = '/home',
  Training = '/training',
  AccountLinking = '/account-linking',
  AgeGate = '/age-gate',
  Game = '/game'
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getRandomElement<T>(input: Record<string, T> | T[]): T {
  const keys = Object.keys(input)
  return input[keys[getRandomInt(keys.length)]]
}

export const getPublicUrlFromConv = (conv: ConversationV3) => {
  return serverRuntimeConfig.publicUrl || ('https://' + conv.headers?.host?.toString())
}

export const sendConv = async ({ conv, data = undefined, suppressMic = false, scene }: {
  conv: ConversationV3,
  suppressMic?: boolean,
  data?: any,
  scene?: string
}) => {

  conv.add(new Canvas({
    enableFullScreen: true,
    url: getPublicUrlFromConv(conv),
    suppressMic,
    data: data,
  }))

  if (scene) {
    conv.scene.next.name = scene
  }
}

export const encrypt = async (token: string) => {
  return CryptoJS.Rabbit.encrypt(token, serverRuntimeConfig.rails.encryptionToken).toString()
}
export const decrypt = async (token: string) => {
  return CryptoJS.Rabbit.decrypt(token, serverRuntimeConfig.rails.encryptionToken).toString(CryptoJS.enc.Utf8) as string
}
