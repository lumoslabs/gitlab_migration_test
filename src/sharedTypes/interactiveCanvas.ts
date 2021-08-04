export type TtsMarkName = "START" | "END" | "ERROR"
export type ListeningMode = "TURN_BASED" | "CONTINUOUS_MATCH"

export interface interactiveCanvasCallbacks {
  onUpdate: (data: any[]) => any,
  onTtsMark: (markName: TtsMarkName) => any,
  onListeningModeChanged: (data: ListeningMode, reason: string) => any,
  onPhraseMatched: (data: string) => any,
}
