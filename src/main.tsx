import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import vi_VN from 'antd/locale/vi_VN'
import './index.css'
import './shared/theme/neumorphism.css'
import { neumorphismTheme } from './shared/theme/neumorphism'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={neumorphismTheme} locale={vi_VN}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
