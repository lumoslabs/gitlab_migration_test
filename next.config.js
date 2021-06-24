module.exports = () => {
  return {
    serverRuntimeConfig: {
      // Will only be available on the server side
      google: {
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      public_url: process.env.PUBLIC_URL
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      interactiveCanvasLibUrl: 'https://www.gstatic.com/assistant/interactivecanvas/api/interactive_canvas.min.js'
    }
  }
}
