import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default.ts'
import { GlobalStyle } from './styles/global.ts'
import { TransactionsProvider } from './contexts/TransactionsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme} >
      <TransactionsProvider>
        <App />
      </TransactionsProvider>

      <GlobalStyle />
    </ThemeProvider>
  </StrictMode>,
)
