import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import routes from './router/index.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {routes.map((item, index) => {
          return <Route key={index} path={item.path} element={item.element} />
        })}
      </Route>
    </Routes>
  </BrowserRouter>
)
