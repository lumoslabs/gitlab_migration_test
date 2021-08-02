import { Canvas, ConversationV3 } from 'actions-on-google'
import { ExpectedPhrase, VerificationStatus } from 'actions-on-google/dist/api/schema'
import appSharedActions from '@store/slices/appSharedActions'
import getConfig from 'next/config'
import { ITraining } from '@backend/libs/TrainingManager'

const { serverRuntimeConfig } = getConfig()

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

export const sendCommand = async ({ conv, commands = [], suppressMic = false, continuousMatchPhrases = undefined }: {
  conv: ConversationV3,
  continuousMatchPhrases?: ExpectedPhrase[],
  suppressMic?: boolean,
  commands?: {
    command: appSharedActions,
    payload: any
  }[]
}) => {
  conv.add(new Canvas({
    enableFullScreen: true,
    continuousMatchConfig: continuousMatchPhrases ? {
      expectedPhrases: continuousMatchPhrases,
      durationSeconds: 180,
    } : undefined,
    url: getPublicUrlFromConv(conv),
    suppressMic,
    data: commands ? commands : []
  }))
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

export const convToUser = (conv: ConversationV3): any => {
  return {
    id: conv.user.params.id,
    name: conv.user.params?.isLinked ? conv.user.params?.tokenPayload?.name : '',
    email: conv.user.params?.isLinked ? conv.user.params?.tokenPayload?.email : '',
    avatar: conv.user.params?.isLinked ? conv.user.params?.tokenPayload?.picture : '',
    timezone: '',
    isGuest: conv.user.verificationStatus === VerificationStatus.Guest,
    isLinked: Boolean(conv.user.params?.isLinked)
  }
}
