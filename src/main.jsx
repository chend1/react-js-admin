import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './store/index'
import { Provider } from 'react-redux'
const root = document.getElementById('root')
createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
)
