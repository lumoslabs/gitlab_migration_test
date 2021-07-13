export declare global {
  interface Window {
    interactiveCanvas: {
      ready: (callbacks: {
        onUpdate: (data: any[]) => any,
        onTtsMark: (markName: string) => any
      }) => any
    },
    clientHeight: number;
    Lumos: any;
    cc: any;
    sendToJavaScript: (data: string | [string, any], argData: any | null) => void;
  }
}
