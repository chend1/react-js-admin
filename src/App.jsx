import { BrowserRouter } from 'react-router'
import RouterView from './router/router'
import 'normalize.css/normalize.css'
import './App.less'
function App() {
  return (
    <BrowserRouter>
      <RouterView />
    </BrowserRouter>
  )
}

export default App
