export declare global {
  interface Window {
    interactiveCanvas: {
      ready: (callbacks: {
        onUpdate: (data: any[]) => any,
        onTtsMark: (markName: "START" | "END" | "ERROR") => any,
        onListeningModeChanged: (data: "TURN_BASED" | "CONTINUOUS_MATCH", reason: string) => any,
        onPhraseMatched: (data: string) => any,
      }) => any,
      sendTextQuery: (text: string) => Promise<"SUCCESS" | "BLOCKED" | "UNKNOWN">,
      setCanvasState: (object: Record<any, any>) => void,
      exitContinuousMatchMode: () => void,
      outputTts: (text: string, prompt: boolean) => void
    };
    clientHeight: number;
    Lumos: any;
    cc: any;
    sendToJavaScript: (data: string | [string, any], argData: any | null) => void;
    sendEventToCocos: (data: any) => void;
  }
}
