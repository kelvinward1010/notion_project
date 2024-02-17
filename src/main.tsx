import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import { RouterProvider } from 'react-router-dom'
import { routerConfig } from './routers'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './context/authContext';
import "./locale/i18n";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
        <Notifications position="top-right"/>
        <RouterProvider router={routerConfig} />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>,
)

// Reload the page when the i18n file changes
if (import.meta.hot) {
  import.meta.hot.accept(["./locale/i18n"], () => {});
}
