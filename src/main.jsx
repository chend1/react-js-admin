import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store/index'
import { Provider } from 'react-redux'
import { mockXHR } from '../mock/index'
import 'dayjs/locale/zh-cn'
import './assets/css/theme.less'

if (import.meta.env.MODE === 'development') {
  mockXHR()
}

const root = document.getElementById('root')

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
)
