import { Canvas, ConversationV3 } from 'actions-on-google'
import { ExpectedPhrase, VerificationStatus } from 'actions-on-google/dist/api/schema'
import appSharedActions from '@store/slices/appSharedActions'
import getConfig from 'next/config'
import { ITraining } from '@backend/libs/TrainingManager'
import CryptoJS from 'crypto-js'
import { ScoreRow } from '@backend/libs/ScoresManager'

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

export const sendCommand = async ({ conv, commands = [], suppressMic = false, continuousMatchPhrases = undefined, scene }: {
  conv: ConversationV3,
  continuousMatchPhrases?: ExpectedPhrase[],
  suppressMic?: boolean,
  commands?: {
    command: appSharedActions,
    payload: any
  }[],
  scene?: string
}) => {
  conv.add(new Canvas({
    enableFullScreen: true,
    continuousMatchConfig: continuousMatchPhrases ? {
      expectedPhrases: continuousMatchPhrases,
      durationSeconds: 180,
    } : undefined,
    url: getPublicUrlFromConv(conv),
    suppressMic,
    data: commands ? commands : [],
  }))
  if (scene) {
    conv.scene.next.name = scene
  }
}

export const setIsFirstLogin = (conv: ConversationV3): void => {
  conv.session.params.isFirstPlay = true
}


export const getIsFirstLogin = (conv: ConversationV3): boolean => {
  return Boolean(conv.session.params.isFirstPlay)
}

export const setTraining = (conv: ConversationV3, training: ITraining) => {
  conv.user.params.training = training
}

export const getTraining = (conv: ConversationV3): ITraining | undefined => {
  return conv.user.params.training
}

export const setBirthday = (conv: ConversationV3, birthday: string): any => {
  conv.user.params.birthday = birthday
}

export const getBirthday = (conv: ConversationV3): any => {
  return conv.user.params.birthday
}

export const setUnderageTimestamp = (conv: ConversationV3, underage: number): any => {
  conv.user.params.underage = underage
}

export const getUnderageTimestamp = (conv: ConversationV3): number => {
  return conv.user.params.underage
}

export const setLumosToken = async (conv: ConversationV3, token: string) => {
  conv.user.params.lumosToken = CryptoJS.Rabbit.encrypt(token, serverRuntimeConfig.rails.encryptionToken).toString()
}

export const getLumosToken = async (conv: ConversationV3) => {
  return CryptoJS.Rabbit.decrypt(conv.user.params?.lumosToken, serverRuntimeConfig.rails.encryptionToken).toString(CryptoJS.enc.Utf8) as string
}

export const getScoresList = (conv: ConversationV3, slug: string) => {
  if (!conv.user.params.scores) {
    return []
  }
  return conv.user.params.scores[slug]
}

export const setScoresList = (conv: ConversationV3, slug: string, scores: ScoreRow[]) => {
  if (!conv.user.params.scores) {
    conv.user.params.scores = {}
  }
  conv.user.params.scores[slug] = scores
}

export const isLumosLinked = (conv: ConversationV3) => {
  return Boolean(conv.user.params.lumosToken)
}

export const convToUser = (conv: ConversationV3): any => {
  const isLinked = isLumosLinked(conv)
  return {
    id: conv.user.params.id,
    name: isLinked ? conv.user.params?.tokenPayload?.name : '',
    email: isLinked ? conv.user.params?.tokenPayload?.email : '',
    avatar: isLinked ? conv.user.params?.tokenPayload?.picture : '',
    timezone: conv?.device?.timeZone?.id,
    isGuest: conv.user.verificationStatus === VerificationStatus.Guest,
    isLinked: isLinked
  }
}
