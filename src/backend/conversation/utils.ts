import { Canvas, ConversationV3 } from "@assistant/conversation"
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


export const sendCommand = async ({ conv, command, payload = undefined, suppressMic = false }: {
  conv: ConversationV3,
  command: appSharedActions,
  payload?: any,
  suppressMic?: boolean
}) => {
  conv.add(new Canvas({
    url: serverRuntimeConfig.public_url || ('https://' + conv.headers?.host?.toString()),
    enableFullScreen: true,
    suppressMic,
    data: [{
      command,
      payload
    }]
  }))
}
