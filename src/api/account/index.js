import request from '../request'

// 获取账号列表
export const getUserList = (params) => {
  return request.get('/user/list', { params })
}

// 新增账号
export const addUser = (data) => {
  return request.post('/user/add', data)
}

// 修改账号
export const editUser = (data) => {
  return request.post('/user/edit', data)
}

// 删除账号
export const delUser = (data) => {
  return request.post('/user/delete', data)
}

// 重置密码
export const resetPassword = (data) => {
  return request.post('/user/resetPassword', data)
}