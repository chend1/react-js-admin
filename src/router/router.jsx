import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { getStorage } from '../utils/storage'
import { handleGetUserInfo, handleLogout } from '../store/mainSlice'
import { localRoutes, asyncRoutes } from './index'
import { generateRoutes } from '@/utils/permission'
function router() {
  const menuList = useSelector((state) => state.main.menuList)
  const routes = useMemo(() => {
    return generateRoutes(asyncRoutes, menuList, 'children', 'path', 'route')
  }, [menuList])
  console.log('routes', routes);
  
  const menu = [...localRoutes, ...routes]
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
      const checkAuth = async () => {
        const token = getStorage('token')
        if (!token) {
          navigate('/login')
          return
        }
        if (menuList.length === 0) {
          console.log('未获取到：menuList', menuList)
          try {
            await dispatch(handleGetUserInfo()).unwrap()
          } catch (error) {
            await dispatch(handleLogout()).unwrap()
            navigate('/login')
          }
        } else if (location.pathname === '/login') {
          navigate('/')
        }
      }
      checkAuth()
    }, [location.pathname])

    // 监听menuList
    useEffect(() => {
      if (menuList.length === 0) {
        // navigate('/401')
      } else {
        if(whiteList.includes(location.pathname)){
          navigate('/')
        } else {
          navigate(location.pathname)
        }
      }
    }, [menuList])

    return <RouterComponent {...props} />
  }
}

export default RouterGuard(router)
