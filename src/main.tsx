import { StrictMode, useSyncExternalStore } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import vi_VN from 'antd/locale/vi_VN'
import '@/shared/design-system/global.css'
import { bentoTheme, bentoDarkTheme } from '@/shared/design-system/antd-theme'
import App from './App.tsx'

function getThemeSnapshot() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
}

function subscribeTheme(cb: () => void) {
  const observer = new MutationObserver(cb)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function Root() {
  const isDark = useSyncExternalStore(subscribeTheme, getThemeSnapshot)

  return (
    <ConfigProvider theme={isDark ? bentoDarkTheme : bentoTheme} locale={vi_VN}>
      <App />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
