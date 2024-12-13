import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store/index'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { mockXHR } from '../mock/index'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

if (import.meta.env.MODE === 'development') {
  mockXHR()
}

const root = document.getElementById('root')
createRoot(root).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
)
