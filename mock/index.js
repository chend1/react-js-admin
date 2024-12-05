import Mock from 'mockjs';
import { param2Obj } from '@/utils/index';
import login from './data/login';
import userData from './data/account';
import roleData from './data/role';
import menuData from './data/menu';
import memberData from './data/member';

const mocks = [...login, ...userData, ...roleData, ...menuData, ...memberData];

export function mockXHR() {
  // 处理参数
  function xhrParams(respond) {
    return (options) => {
      let result = null;
      const { body, type, url } = options;
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url),
      });
      return Mock.mock(result);
    };
  }
  mocks.forEach((item) => {
    Mock.mock(new RegExp(item.url), item.type, xhrParams(item.response));
  });
}
