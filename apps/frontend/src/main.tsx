import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './providers/query-client'
import { routeTree } from './routeTree.gen'
import { Toaster } from "./components/ui/sonner"
import { ThemeProvider } from './components/ui/theme-provider'
import './index.css'
import { WebSocketProvider } from './providers/websocket-provider'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme='dark'>
        <QueryClientProvider client={queryClient} >
          <WebSocketProvider>
            <RouterProvider router={router} />
            <Toaster  />
          </WebSocketProvider>
        </QueryClientProvider>
      </ThemeProvider >
    </StrictMode>,
  )
}