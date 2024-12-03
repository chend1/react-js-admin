import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Menu, Dropdown } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import router from '../router/index'
import './layout.less'

function layout() {
  const navigate = useNavigate()
  const menuClick = (e) => {
    const keyPath = e.keyPath.reverse().filter((item) => item !== 'tmp-0')
    const path = keyPath.join('/')
    navigate(path)
  }
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
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
          items={router}
          inlineCollapsed={collapsed}
        />
      </nav>
      <div className="layout-content">
        <div className="header">
          <Dropdown menu={{ items: [{
            label: '退出登录',
            key: 'logout',
          }] }}>
            <div className="user-info">
              <div className="avatar"></div>
              <div className="name">张三</div>
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
