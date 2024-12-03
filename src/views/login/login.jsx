import './login.less'
import { useState } from 'react'
import { Input, Button } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
function Login() {
  const [accountInfo, setAccountInfo] = useState({
    account: '',
    password: '',
  })

  const loginClick = () => {
    console.log(accountInfo)
  }
  return (
    <div className="login">
      <div className="login-box">
        <div className="left">左边</div>
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
                onClick={ loginClick }
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
