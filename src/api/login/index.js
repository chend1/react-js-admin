import request from '../request'

// 登录
export const login = (data) => {
  return request.post('/login', data)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/user/info')
}