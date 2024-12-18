import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import { getStorage } from '../utils/storage'
import { handleGetUserInfo, handleLogout } from '../store/mainSlice'
import { localRoutes, asyncRoutes, redirectRoutes } from './index'
import { generateRoutes } from '@/utils/permission'

// 判断是否第一次渲染
let renderNum = 0
function router() {
  const menuList = useSelector((state) => state.main.menuList)
  const routes = useMemo(() => {
    return generateRoutes(asyncRoutes, menuList, 'children', 'path', 'route')
  }, [menuList])
  const menu = [...localRoutes, ...routes]
  if (renderNum > 1) {
    menu.push(...redirectRoutes)
  }
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
      /**
       * 由于登录后，menuList初始值也会触发useEffect，因此需要判断是否第一次触发
       * 两次均为空时，才能确定没有菜单权限，跳转到401
       */
      renderNum++
      if (menuList.length === 0) {
        if (renderNum > 1) {
          navigate('/401')
          renderNum = 0
        }
      } else {
        navigate(location.pathname)
      }
    }, [menuList])

    return <RouterComponent {...props} />
  }
}

export default RouterGuard(router)
