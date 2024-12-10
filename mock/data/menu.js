import { getStorage, setStorage } from '@/utils/storage';
import { timestampChange } from '@/utils/index';
// 菜单列表
export const menuList = getStorage('menuList') || [
  {
    id: 100,
    path: '/home',
    title: '首页',
    icon: 'House',
    status: 1,
    children: [],
    parent_id: 0,
    sort: 1,
  },
  {
    id: 101,
    path: '/about',
    title: '关于我们',
    icon: 'Lock',
    status: 1,
    children: [],
    parent_id: 0,
    sort: 2,
  },
  {
    id: 102,
    path: '/table',
    title: 'Table表格',
    icon: 'Memo',
    children: [],
    status: 1,
    parent_id: 0,
    sort: 3,
  },
  {
    id: 103,
    path: '/power',
    title: '权限管理',
    icon: 'Lock',
    status: 1,
    parent_id: 0,
    sort: 4,
    children: [],
  },
  {
    id: 104,
    path: 'accountManage',
    title: '用户管理',
    icon: '',
    children: [],
    status: 1,
    parent_id: 103,
    sort: 1,
  },
  {
    id: 105,
    path: 'menuManage',
    title: '菜单管理',
    icon: '',
    children: [],
    status: 1,
    parent_id: 103,
    sort: 3,
  },
  {
    id: 106,
    path: 'roleManage',
    title: '角色管理',
    icon: '',
    children: [],
    status: 1,
    parent_id: 103,
    sort: 2,
  },
  {
    id: 107,
    path: '/games',
    title: '快乐游戏',
    icon: '',
    children: [],
    status: 0,
    parent_id: 0,
    sort: 2,
  },
  {
    id: 108,
    path: '/games/gomoku',
    title: '五子棋',
    icon: '',
    children: [],
    status: 1,
    parent_id: 107,
    sort: 2,
  },
  {
    id: 109,
    path: '/games/tictactoe',
    title: '井字棋',
    icon: '',
    children: [],
    status: 1,
    parent_id: 107,
    sort: 2,
  },
  {
    id: 110,
    path: '/rithText',
    title: '富文本',
    icon: 'Edit',
    children: [],
    status: 1,
    parent_id: 0,
    sort: 2,
  },
];
// 获取菜单列表
const getMenuList = {
  url: '/menu/list',
  type: 'get',
  response: () => ({
    status: true,
    code: 200,
    data: {
      list: modifyMenuList(menuList),
    },
  }),
};

// 新增菜单
const addMenu = {
  url: '/menu/add',
  type: 'post',
  response: (config) => {
    const meun = { ...config.body, children: [] };
    const id = menuList[menuList.length - 1].id + 1;
    const createTime = timestampChange(new Date());
    const item = {
      id,
      ...meun,
      create_time: createTime,
    };
    menuList.push(item);
    setStorage('menuList', menuList);
    console.log('新增', menuList);
    return {
      status: true,
      code: 200,
      data: {
        msg: '新增成功',
      },
    };
  },
};

// 修改菜单列表
const editMenu = {
  url: '/menu/edit',
  type: 'post',
  response: (config) => {
    console.log(config);
    const { id } = config.body;
    const index = menuList.findIndex((item) => item.id === id);
    menuList[index] = Object.assign(menuList[index], config.body, { children: [] });
    setStorage('menuList', menuList);
    return {
      status: true,
      code: 200,
      data: {
        msg: '修改成功',
      },
    };
  },
};

// 删除菜单
const delMenu = {
  url: '/menu/del',
  type: 'post',
  response: (config) => {
    const { id } = config.body;
    const index = menuList.findIndex((item) => item.id === id);
    menuList.splice(index, 1);
    setStorage('menuList', menuList);
    return {
      status: true,
      code: 200,
      data: {
        msg: '删除成功',
      },
    };
  },
};

export default [getMenuList, addMenu, editMenu, delMenu];

// 修改菜单数据结构
export function modifyMenuList(data = menuList, key = 'parent_id') {
  const list = [];
  const children = [];
  const dataList = JSON.parse(JSON.stringify(data));
  dataList.forEach((item) => {
    if (item[key] === 0) {
      list.push(item);
    } else {
      children.push(item);
    }
  });
  findChildren(list, children, key);
  return list;
}
// 寻找子级菜单
function findChildren(list, children, key = 'parent_id') {
  const newList = [];
  const newChildren = [];
  children.forEach((item) => {
    const menu = list.find((listItem) => listItem.id === item[key]);
    if (!menu) {
      newChildren.push(item);
    } else {
      newList.push(item);
      menu.children.push(item);
    }
  });
  if (newChildren.length > 0) {
    findChildren(newList, newChildren, key);
  }
}
