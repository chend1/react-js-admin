import { useState, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Menu, Dropdown } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { handleLogout } from '../store/mainSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { asyncRoutes } from '@/router'
import { generateRoutes } from '@/utils/permission'
import './layout.less'

function layout() {
  const location = useLocation()
  const pathname = location.pathname
  const defaultPath = pathname
    .split('/')
    .filter((item) => item !== '')
    .map((item, index) => {
      if (index === 0) {
        return `/${item}`
      } else {
        return item
      }
    })
  const openKeys = defaultPath.length > 1 ? defaultPath.slice(0, -1) : []
  const navigate = useNavigate()
  const menuList = useSelector((state) => state.main.menuList)
  const userInfo = useSelector((state) => state.main.userInfo)
  const menuRoutes = useMemo(() => {
    return generateRoutes(asyncRoutes, menuList, 'children', 'path', 'menu')
  }, [menuList])
  const menuClick = (e) => {
    const keyPath = e.keyPath.reverse().filter((item) => item !== 'tmp-0')
    const path = keyPath.join('/')
    navigate(path)
  }
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(handleLogout())
    navigate('/login')
  }

  const changeTheme = () => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
    }
  }
  return (
    <div className="layout">
      <nav style={{ width: collapsed ? '80px' : '230px' }}>
        <div className="head">
          <div
            className="logo"
            style={{ display: collapsed ? 'none' : 'block' }}
          >
            管理后台
          </div>
          <div className="tool" onClick={toggleCollapsed}>
            <MenuFoldOutlined
              style={{ display: !collapsed ? 'block' : 'none' }}
            />
            <MenuUnfoldOutlined
              style={{ display: !collapsed ? 'none' : 'block' }}
            />
          </div>
        </div>
        <Menu
          mode="inline"
          style={{ flex: 1 }}
          onClick={menuClick}
          items={menuRoutes}
          inlineCollapsed={collapsed}
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={defaultPath}
        />
      </nav>
      <div className="layout-content">
        <div className="header">
          <Dropdown
            menu={{
              items: [
                {
                  label: <span onClick={changeTheme}>暗色主题</span>,
                  key: 'theme',
                },
                {
                  label: <span onClick={logout}>退出登录</span>,
                  key: 'logout',
                },
              ],
            }}
          >
            <div className="user-info">
              <div className="avatar">
                <img src={userInfo.avatar} alt="" />
              </div>
              <div className="name">{userInfo.name}</div>
            </div>
          </Dropdown>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default layout
