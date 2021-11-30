import React from 'react'
import mitt, { Emitter } from 'mitt'

export type appBusEvents = {
  onPhraseMatched: any;
  onPhraseUnmatched: void;
  onListeningModeChanged: boolean;
  onTtsMark: string;
  onIntentYes: void;
  onIntentNext: void;
  onIntentNo: void;
  onIntentHelp: void;
  //TODO: remove it with private game intents
  onIntentRestartCMM: void;
  onIntentRestartGame: void;
  onIntentResumeGame: void;
  onDebugLog: string;
}

export const BusContext = React.createContext<Emitter<appBusEvents>>(null)
const P = BusContext.Provider

export default function AppBusProvider({ children }) {
  const [bus] = React.useState(() => mitt<appBusEvents>())
  return <P value={bus}>{children}</P>
}
