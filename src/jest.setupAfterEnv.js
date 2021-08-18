import '@testing-library/jest-dom'
import * as Aphrodite from 'aphrodite'
import * as AphroditeNoImportant from 'aphrodite/no-important'

Aphrodite.StyleSheetTestUtils.suppressStyleInjection()
AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection()

jest.setTimeout(100000)

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    google: {
      clientId: 'google_client_id'
    },
  },
  publicRuntimeConfig: {
    amplitude: {
      apiKey: 'amplitude_api_key'
    },
    interactiveCanvasLibUrl: 'https://www.gstatic.com/assistant/interactivecanvas/api/interactive_canvas.min.js',
    rollbar: {
      clientToken: '-',
      serverToken: '-',
      enviroment: 'dev'
    }
  }
}))
