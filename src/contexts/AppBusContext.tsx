import React from 'react'
import mitt, { Emitter } from 'mitt'
import { TtsMarkName } from '@sharedTypes/interactiveCanvas';

export type appBusEvents = {
  onPhraseMatched: any;
  onListeningModeChanged: boolean;
  onTtsMark: TtsMarkName,
  onIntentYes: void;
  onIntentNo: void;
};

export const BusContext = React.createContext<Emitter<appBusEvents>>(null)
const P = BusContext.Provider

export default function AppBusProvider({ children }) {
  const [bus] = React.useState(() => mitt<appBusEvents>())
  return <P value={bus}>{children}</P>
}
