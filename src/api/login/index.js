import request from '../request'

// 登录
export const login = (params) => {
  return request.post('/login', params)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/user/info')
}