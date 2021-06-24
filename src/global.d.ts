export declare global {
  interface Window {
    interactiveCanvas: {
      ready: (callbacks: {
        onUpdate: (data: any[]) => any,
        onTtsMark: (markName: string) => any
      }) => any
    }
  }
}
