import request from '../request'

// 获取角色列表
export const getMenuList = (params) => {
  return request.get('/menu/list', { params })
}

// 新增角色
export const addMenu = (data) => {
  return request.post('/menu/add', data)
}

// 修改角色
export const editMenu = (data) => {
  return request.post('/menu/edit', data)
}

// 删除角色
export const delMenu = (data) => {
  return request.post('/menu/del', data)
}
