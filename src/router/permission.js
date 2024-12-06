/** 根据可访问路由，返回一维路由
 *
 *  @param {Array} routeList 需要循环的路由
 *  @param {String} key 判断多维的字段
 */

function getPowerRouteList(routeList, key = 'children') {
  const powerRouteList = [];
  routeList.forEach((route) => {
    powerRouteList.push(route);
    if (route[key] && route[key].length) {
      const list = getPowerRouteList(route[key], key);
      powerRouteList.push(...list);
    }
  });
  return powerRouteList;
}

/** 根据本地路由和有权限路由,返回前端使用路由和可访问路径列表
 *
 *  @param {Array} localRoutes 本地所有路由
 *  @param {Array} powerRouteList 可访问路由列表
 */
function getAccessibleRoutes(localRoutes, powerRouteList) {
  const routeList = [];
  const pathList = [];
  localRoutes.forEach((route) => {
    const item = route;
    const powerRoute = powerRouteList.filter(
      (option) => option.path === item.path,
    );
    if (powerRoute[0]) {
      if (item.children && item.children.length) {
        const { accessibleRoutes, showPathList } = getAccessibleRoutes(
          item.children,
          powerRouteList,
        );
        item.children = accessibleRoutes;
        routeList.push(item);
        pathList.push(...showPathList, item.path);
      } else {
        item.meta.title = powerRoute[0].title;
        routeList.push(item);
        pathList.push(item.path);
      }
    }
  });
  return { accessibleRoutes: routeList, showPathList: pathList };
}

/** 根据权限路由和可访问路径列表，返回菜单列表
 *
 *  @param {Array} powerRoutes 权限路由
 *  @param {Array} showPathList 可访问路径列表
 */

function getMenuList(powerRoutes, showPathList) {
  const menuList = [];
  powerRoutes.forEach((item) => {
    const list = { ...item };
    if (showPathList.indexOf(item.path) !== -1) {
      if (item.children && item.children.length) {
        list.children = getMenuList(item.children, showPathList);
        menuList.push(list);
      } else {
        list.children = [];
        menuList.push(list);
      }
    }
  });
  return menuList;
}

/** 菜单列表排序
 *
 *  @param {Array} menuList 菜单列表
 *
 */
function sortMenu(menuList) {
  const list = [];
  let sort = 0;
  menuList.forEach((item) => {
    const menu = { ...item };
    sort = item.sort;
    if (list[sort]) {
      list[sort].push(menu);
    } else {
      list[sort] = [menu];
    }
    if (menu.children && menu.children.length) {
      menu.children = sortMenu(item.children);
    } else {
      menu.children = [];
    }
  });
  return list.filter((option) => !!option).flat();
}

/** 根据本地路由和有权限路由，生成可访问路由
 *
 *  @param {Array} localRoutes 本地所有路由
 *  @param {Array} powerRoutes 权限路由
 *
 */

export function generateRoutes(localRoutes, powerRoutes) {
  // 一维权限路由列表
  const powerRouteList = getPowerRouteList(powerRoutes);
  // 本地可使用路由和可显示路径列表
  const { accessibleRoutes, showPathList } = getAccessibleRoutes(localRoutes, powerRouteList);
  // 菜单显示列表
  const menuList = getMenuList(powerRoutes, showPathList);
  // 菜单排序
  const sortMenuList = sortMenu(menuList);
  return new Promise((reject) => {
    const result = {
      accessibleRoutes,
      menuList: sortMenuList,
    };
    reject(result);
  });
}
