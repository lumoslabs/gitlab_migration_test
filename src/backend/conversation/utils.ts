import { Canvas, ConversationV3 } from "actions-on-google"
import { ExpectedPhrase } from "actions-on-google/dist/api/schema"
import appSharedActions from "@store/slices/appSharedActions"
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getRandomElement<T>(input: Record<string, T> | T[]): T {
  const keys = Object.keys(input)
  return input[keys[getRandomInt(keys.length)]]
}


export const sendCommand = async ({ conv, command = undefined, payload = undefined, suppressMic = false, continuousMatchPhrases = undefined }: {
  conv: ConversationV3,
  command?: appSharedActions,
  continuousMatchPhrases?: ExpectedPhrase[],
  payload?: any,
  suppressMic?: boolean
}) => {
  conv.add(new Canvas({
    //TODO: check this property in actions-on-google lib
    //@ts-ignore
    enableFullScreen: true,
    continuousMatchConfig: continuousMatchPhrases ? {
      expectedPhrases: continuousMatchPhrases,
      durationSeconds: 180,
    } : undefined,
    url: serverRuntimeConfig.public_url || ('https://' + conv.headers?.host?.toString()),
    suppressMic,
    data: command ? [{
      command,
      payload
    }] : []
  }))
}
