import { getStorage, setStorage } from '@/utils/storage';
import { timestampChange } from '@/utils/index';

// 账号列表
export const accountList = getStorage('accountList') || [
  {
    id: 1,
    name: 'admin',
    sex: 1,
    account: 'admin',
    password: '123456',
    create_time: '2022-10-26 10:10:10',
    status: 1,
    role: 1,
  },
  {
    id: 2,
    name: 'user',
    sex: 1,
    account: 'user',
    password: '123456',
    create_time: '2022-10-26 10:10:10',
    status: 1,
    role: 2,
  },
];

const getUserList = {
  url: '/user/list',
  type: 'get',
  response: (config) => {
    let list = [];
    const { page = 1, size = 20, keyword } = config.query;
    const searchList = accountList.filter(
      (item) => !keyword || item.name.indexOf(keyword) !== -1
        || item.account.indexOf(keyword) !== -1,
    );
    list = searchList.slice((page - 1) * size, page * size);
    console.log('searchList', searchList, page, size);
    return {
      status: true,
      code: 200,
      data: {
        count: searchList.length,
        list,
        page,
        size,
      },
    };
  },
};
// 新增账号
const addUser = {
  url: '/user/add',
  type: 'post',
  response: (config) => {
    const id = accountList[accountList.length - 1].id + 1;
    const createTime = timestampChange(new Date());
    const item = {
      password: '123456', ...config.body, id, create_time: createTime,
    };
    accountList.push(item);
    setStorage('accountList', accountList);
    return {
      status: true,
      code: 200,
      data: {},
    };
  },
};
// 修改账号
const editUser = {
  url: '/user/edit',
  type: 'post',
  response: (config) => {
    console.log(config);
    const { body } = config;
    const idx = accountList.findIndex((item) => item.id === body.id);
    accountList[idx] = Object.assign(accountList[idx], body);
    setStorage('accountList', accountList);
    return {
      status: true,
      code: 200,
      data: {},
    };
  },
};
// 删除账号
const deleteRole = {
  url: '/user/delete',
  type: 'post',
  response: (config) => {
    const { body } = config;
    const idx = accountList.findIndex((item) => item.id === body.id);
    accountList.splice(idx, 1);
    setStorage('accountList', accountList);
    return {
      status: true,
      code: 200,
      data: {},
    };
  },
};

export default [getUserList, addUser, editUser, deleteRole];
