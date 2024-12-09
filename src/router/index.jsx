import Login from '@/views/login/login'
import Layout from '@/layout/layout'
import Home from '@/views/home/home'
import Error401 from '@/views/error/401'
import Error404 from '@/views/error/404'
import AccountManage from '@/views/power/accountManage/accountManage'
import MenuManage from '@/views/power/menuManage/menuManage'
import RuleManage from '@/views/power/ruleManage/ruleManage'
import { HomeOutlined } from '@ant-design/icons'

export const localRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/401',
        element: <Error401 />,
        label: '401',
        key: '401',
        icon: <HomeOutlined />,
      },
      {
        path: '/404',
        element: <Error404 />,
        label: '404',
        key: '404',
        icon: <HomeOutlined />,
      },
    ],
  }
]

export const asyncRoutes = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: <Home />,
        label: '首页',
        key: 'home',
        icon: <HomeOutlined />,
      },
      {
        path: '/power',
        label: '权限管理',
        key: 'power',
        icon: <HomeOutlined />,
        children: [
          {
            path: 'accountManage',
            element: <AccountManage />,
            label: '账号管理',
            key: 'accountManage',
          },
          {
            path: 'menuManage',
            element: <MenuManage />,
            label: '菜单管理',
            key: 'menuManage',
          },
          {
            path: 'ruleManage',
            element: <RuleManage />,
            label: '规则管理',
            key: 'ruleManage',
          },
        ],
      },
    ],
  },
]

