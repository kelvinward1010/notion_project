import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { RouterProvider } from 'react-router-dom'
import { routerConfig } from './routers'
import { MantineProvider } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={routerConfig} />
    </MantineProvider>
  </React.StrictMode>,
)
