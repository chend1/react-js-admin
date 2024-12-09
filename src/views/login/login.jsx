import './login.less'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import { handleLogin } from '../../store/mainSlice'
function Login() {
  const dispatch = useDispatch()
  const [accountInfo, setAccountInfo] = useState({
    account: import.meta.env.MODE === 'development' ? 'admin' : '',
    password: import.meta.env.MODE === 'development' ? '123456' : '',
  })
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.main.userInfo)
  useEffect(() => {
    if (userInfo.id) {
      console.log('登录成功')
      navigate('/')
    }
  })
  const loginClick = async () => {
    dispatch(handleLogin(accountInfo))
  }
  return (
    <div className="login">
      <div className="login-box">
        <div className="left"></div>
        <div className="right">
          <div className="title">登录管理后台</div>
          <div className="form">
            <div className="item">
              <Input
                size="large"
                placeholder="请输入账号"
                prefix={<UserOutlined />}
                value={accountInfo.account}
                onChange={(e) => {
                  setAccountInfo({
                    ...accountInfo,
                    account: e.target.value,
                  })
                }}
              />
            </div>
            <div className="item">
              <Input.Password
                size="large"
                placeholder="请输入密码"
                prefix={<KeyOutlined />}
                value={accountInfo.password}
                onChange={(e) => {
                  setAccountInfo({
                    ...accountInfo,
                    password: e.target.value,
                  })
                }}
              />
            </div>
            <div className="operation">
              <Button
                type="primary"
                size="large"
                style={{
                  width: '100%',
                  color: '#fff',
                  backgroundColor: '#12ADA9',
                }}
                onClick={loginClick}
              >
                登录
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
