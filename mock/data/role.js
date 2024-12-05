import { getStorage, setStorage } from '@/utils/storage';
import { timestampChange } from '@/utils/index';
// 角色列表
export const roleList = getStorage('roleList') || [
  {
    id: 1,
    name: '管理员',
    status: 1,
    menuList: [100, 101, 102, 103, 104, 105, 106, 107],
    create_time: '2022-10-26 10:10:10',
  },
  {
    id: 2,
    name: '普通用户',
    status: 1,
    menuList: [100, 101, 102],
    create_time: '2022-10-26 10:10:10',
  },
];
// 获得角色列表
const getRoleList = {
  url: '/role/list',
  type: 'get',
  response: (config) => {
    let list = [];
    const { page, size, keyword } = config.query;
    const searchList = roleList.filter(
      (item) => item.name.indexOf(keyword || '') !== -1
        || item.name.indexOf(keyword || '') !== -1,
    );
    list = searchList.slice((page - 1) * size, page * size);
    return {
      status: true,
      code: 200,
      data: {
        count: roleList.length,
        list,
      },
    };
  },
};
// 新增角色
const addRole = {
  url: '/role/add',
  type: 'post',
  response: (config) => {
    const id = roleList[roleList.length - 1].id + 1;
    const createTime = timestampChange(new Date());
    const item = {
      id, ...config.body, create_time: createTime,
    };
    roleList.push(item);
    setStorage('roleList', roleList);
    return {
      status: true,
      code: 200,
      data: {
        id,
      },
    };
  },
};
// 修改角色
const editRole = {
  url: '/role/edit',
  type: 'post',
  response: (config) => {
    const { id } = config.body;
    const index = roleList.findIndex((item) => item.id === id);
    roleList[index] = Object.assign(roleList[index], config.body);
    setStorage('roleList', roleList);
    return {
      status: true,
      code: 200,
      data: {
        id,
      },
    };
  },
};
// 删除角色
const deleteRole = {
  url: '/role/delete',
  type: 'post',
  response: (config) => {
    const { id } = config.body;
    const index = roleList.findIndex((item) => item.id === id);
    roleList.splice(index, 1);
    setStorage('roleList', roleList);
    return {
      status: true,
      code: 200,
      data: {
        id,
      },
    };
  },
};

// 授权角色
const authRole = {
  url: '/role/auth',
  type: 'post',
  response: (config) => {
    const { id } = config.body;
    const index = roleList.findIndex((item) => item.id === id);
    roleList[index] = config.body;
    setStorage('roleList', roleList);
    return {
      status: true,
      code: 200,
      data: {
        id,
      },
    };
  },
};

export default [getRoleList, addRole, editRole, deleteRole, authRole];
