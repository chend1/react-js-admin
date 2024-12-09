import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { getStorage } from '../utils/storage'
import { handleGetUserInfo } from '../store/mainSlice'
import { localRoutes, asyncRoutes } from './index'
function router() {
  const menuList = useSelector((state) => state.main.menuList)
  console.log('menuList', menuList)
  const menu = [...localRoutes, ...asyncRoutes]
  const element = useRoutes(menu)
  return element
}

// 路由守卫
const whiteList = ['/404', '/401']
function RouterGuard(RouterComponent) {
  return function protectedRoute(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const menuList = useSelector((state) => state.main.menuList)
    const dispatch = useDispatch()
    useEffect(() => {
      const token = getStorage('token')
      if (!token) {
        navigate('/login')
      } else {
        if (menuList.length === 0 && !whiteList.includes(location.pathname)) {
          console.log('未获取到：menuList', menuList)
          dispatch(handleGetUserInfo())
          if (menuList.length === 0) {
            navigate('/404')
          } else {
            navigate(location.pathname)
          }
        } else if (location.pathname === '/login') {
          navigate('/')
        }
      }
    }, [location.pathname, navigate])
    return <RouterComponent {...props} />
  }
}

export default RouterGuard(router)
