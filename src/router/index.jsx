import Login from '@/views/login/login'
import Layout from '@/layout/layout'
import Home from '@/views/home/home'
import AccountManage from '@/views/power/accountManage/accountManage'
import MenuManage from '@/views/power/menuManage/menuManage'
import RuleManage from '@/views/power/ruleManage/ruleManage'
import { HomeOutlined } from '@ant-design/icons'

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
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

export default routes
