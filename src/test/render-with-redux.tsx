import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import AppBusProvider from '@contexts/AppBusContext'
import InteractiveCanvasProvider from '@contexts/InteractiveCanvasContext'
import rootReducer from '@store/rootReducer'

function render(
  ui,
  {
    //@ts-ignore
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>
      <MemoryRouter>
        <AppBusProvider>
          <InteractiveCanvasProvider>
            {children}
          </InteractiveCanvasProvider>
        </AppBusProvider>
      </MemoryRouter>
    </Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
