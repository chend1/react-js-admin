import Mock from 'mockjs';
import { timestampChange } from '@/utils/index';

const data = Mock.mock({
  'list|50-100': [
    {
      'id|+1': 1,
      name: '@cword(2,4)',
      sex: '@natural(1,2)',
      position: '@cword(2,4)',
      create_time: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      status: '@natural(0,1)',
    },
  ],
});
// 获取成员列表
const getMemberList = {
  url: '/member/list',
  type: 'get',
  response: (config) => {
    let list = [];
    const { page, size, keyword } = config.query;
    const searchList = data.list.filter((item) => item.name.indexOf(keyword) !== -1
      || item.position.indexOf(keyword) !== -1);
    list = searchList.slice((page - 1) * size, page * size);
    return {
      status: true,
      code: 200,
      data: {
        count: searchList.length,
        list,
      },
    };
  },
};

// 新增成员
const addMember = {
  url: '/member/add',
  type: 'post',
  response: (config) => {
    const id = data.list[data.list.length - 1].id + 1;
    const createTime = timestampChange(new Date());
    const item = {
      ...config.body, id, create_time: createTime,
    };
    data.list.unshift(item);
    return {
      status: true,
      code: 200,
      data: {
        msg: '新增成功',
      },
    };
  },
};

// 编辑成员
const editMember = {
  url: '/member/edit',
  type: 'post',
  response: (config) => {
    const { id } = config.body;
    const index = data.list.findIndex((item) => item.id === id);
    data.list[index] = Object.assign(data.list[index], config.body);
    return {
      status: true,
      code: 200,
      data: {
        msg: '修改成功',
      },
    };
  },
};

// 删除成员
const deleteMember = {
  url: '/member/delete',
  type: 'post',
  response: (config) => {
    const { id } = config.body;
    const index = data.list.findIndex((item) => item.id === id);
    data.list.splice(index, 1);
    return {
      status: true,
      code: 200,
      data: {
        msg: '删除成功',
      },
    };
  },
};

export default [getMemberList, addMember, editMember, deleteMember];
