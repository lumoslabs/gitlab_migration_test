import { interactiveCanvasCallbacks } from '@sharedTypes/interactiveCanvas'

export interface IntentHandler {

}

export interface HandlerRegistration {
  deleteHandler: () => void
}

export interface MatchedIntent {
  getIntentArg: (param: string) => string | undefined
}

export declare global {
  interface Window {
    interactiveCanvas: {
      ready: (callbacks: interactiveCanvasCallbacks) => any,
      sendTextQuery: (text: string) => Promise<"SUCCESS" | "BLOCKED" | "UNKNOWN">,
      setCanvasState: (object: Record<any, any>) => void,
      exitContinuousMatchMode: () => void,
      outputTts: (text: string, prompt: boolean) => void,
      createIntentHandler: (intentId: string, callback: (matchedIntent: MatchedIntent) => any) => IntentHandler,
      expect: (expectation: IntentHandler) => HandlerRegistration,
      clearExpectations: () => undefined
      enterContinuousMatchMode: (phrases: any[], timeout: number) => undefined
      setUserParam: (key: string, value: any) => Promise<unknown>
      getUserParam: (key: string) => Promise<unknown>
      resetUserParam: () => undefined,
      triggerScene: (scene: string) => Promise<unknown>
    };
    interactiveCanvasProxy: {
      ready: (callbacks: interactiveCanvasCallbacks) => any
    }
    Lumos: any;
    cc: any;
    sendToJavaScript: (data: string | [string, any], argData: any | null) => void;
    sendEventToCocos: (data: any) => void;
    amplitude: any;
  }
}
