export type ListeningMode = 'TURN_BASED' | 'CONTINUOUS_MATCH'

export interface interactiveCanvasCallbacks {
  onUpdate: (data: any[]) => any,
  onTtsMark: (markName: string) => any,
  onListeningModeChanged: (data: ListeningMode, reason: string) => any,
  onPhraseMatched: (data: any) => any,
}
