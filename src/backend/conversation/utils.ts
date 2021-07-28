import { Canvas, ConversationV3 } from 'actions-on-google'
import { ExpectedPhrase } from 'actions-on-google/dist/api/schema'
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

export const sendCommand = async ({ conv, command = undefined, payload = undefined, suppressMic = false, continuousMatchPhrases = undefined }: {
  conv: ConversationV3,
  command?: appSharedActions,
  continuousMatchPhrases?: ExpectedPhrase[],
  payload?: any,
  suppressMic?: boolean,
}) => {
  conv.add(new Canvas({
    enableFullScreen: true,
    continuousMatchConfig: continuousMatchPhrases ? {
      expectedPhrases: continuousMatchPhrases,
      durationSeconds: 180,
    } : undefined,
    url: getPublicUrlFromConv(conv),
    suppressMic,
    data: command ? [{
      command,
      payload
    }] : []
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
