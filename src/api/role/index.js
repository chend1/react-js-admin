import request from '../request'

// 获取角色列表
export const getRoleList = (params) => {
  return request.get('/role/list', { params })
}

// 新增角色
export const addRole = (data) => {
  return request.post('/role/add', data)
}

// 修改角色
export const editRole = (data) => {
  return request.post('/role/edit', data)
}

// 修改角色
export const authRole = (data) => {
  return request.post('/role/auth', data)
}

// 删除角色
export const delRole = (data) => {
  return request.post('/role/del', data)
}
