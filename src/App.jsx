import { BrowserRouter } from 'react-router'
import RouterView from './router/router'
import 'normalize.css/normalize.css'
import './App.less'
import '@/assets/css/theme.less'
import { ConfigProvider, theme } from 'antd'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import { useSelector } from 'react-redux'

function App() {
  const myTheme = useSelector((state) => state.main.theme)
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: myTheme === 'dark' ? theme.darkAlgorithm : '',
      }}
    >
      <BrowserRouter>
        <RouterView />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
