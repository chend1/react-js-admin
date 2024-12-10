/** 扁平化数组
 *
 *  @param {Array} routeList 需要循环的路由
 *  @param {String} key 判断多维的字段
 */

function flatArray(routeList, key = 'children') {
  const powerRouteList = []
  routeList.forEach((route) => {
    powerRouteList.push(route)
    if (route[key] && route[key].length) {
      const list = flatArray(route[key], key)
      powerRouteList.push(...list)
    }
  })
  return powerRouteList
}

/** 根据本地路由和有权限路由,返回前端使用路由和可访问路径列表
 *
 *  @param {Array} localRoutes 本地所有路由
 *  @param {Array} powerRouteList 可访问路由列表
 *  @param {String} key 路径key
 */
function getAccessibleRoutes(localRoutes, powerRouteList, key = 'path') {
  const routeList = []
  localRoutes.forEach((route) => {
    const item = route
    const powerRoute = powerRouteList.filter(
      (option) => option[key] === item[key] || !route[key]
    )
    if (powerRoute[0]) {
      if (item.children && item.children.length) {
        const { accessibleRoutes } = getAccessibleRoutes(
          item.children,
          powerRouteList
        )
        item.children = accessibleRoutes
        routeList.push(item)
      } else {
        item.label = powerRoute[0].title
        routeList.push(item)
      }
    }
  })
  return { accessibleRoutes: routeList }
}

/** 根据权限路由和可访问路径列表，返回菜单列表
 *
 *  @param {Array} powerRoutes 权限路由
 *  @param {Array} localRouteList 一维本地路由
 *  @param {String} key 路径key
 */

function getMenuList(powerRoutes, localRouteList, key = 'path') {
  const menuList = []
  powerRoutes.forEach((item) => {
    const menuInfo = { ...item }
    const route = localRouteList.find((option) => option[key] === item[key])
    if (route && route[key].indexOf(menuInfo[key]) !== -1) {
      if (menuInfo.children && menuInfo.children.length) {
        menuInfo.icon = route.icon
        menuInfo.children = getMenuList(menuInfo.children, localRouteList)
        menuList.push(menuInfo)
      } else {
        menuInfo.children = []
        menuInfo.icon = route.icon
        menuList.push(menuInfo)
      }
    }
  })
  return menuList
}

/** 菜单列表排序
 *
 *  @param {Array} menuList 菜单列表
 * @param {String} key 路径key
 *
 */
function sortMenu(menuList, key = 'path') {
  const list = []
  let sort = 0
  menuList.forEach((item) => {
    item.key = item[key]
    item.label = item.title
    const menu = { ...item }
    sort = item.sort
    if (list[sort]) {
      list[sort].push(menu)
    } else {
      list[sort] = [menu]
    }
    if (menu.children && menu.children.length) {
      menu.children = sortMenu(item.children)
    } else {
      delete menu.children
    }
  })
  return list.filter((option) => !!option).flat()
}

/** 根据本地路由和有权限路由，生成可访问路由
 *
 *  @param {Array} localRoutes 本地所有路由
 *  @param {Array} powerRoutes 权限路由
 *  @param {String} children 判断是否有子集的字段，默认children
 *  @param {String} key 路径字段，默认path
 *  @param {String} type 需要返回的是路由还是显示菜单，默认all，都返回
 *
 */

export function generateRoutes(
  localRoutes,
  powerRoutes,
  children = 'children',
  key = 'path',
  type = 'all'
) {
  // 一维权限路由列表
  const powerRouteList = flatArray(powerRoutes, children)
  // 本地可使用路由和可访问路径（path）列表
  const { accessibleRoutes } = getAccessibleRoutes(
    localRoutes,
    powerRouteList,
    key
  )
  switch (type) {
    case 'route': {
      return accessibleRoutes
    }
    case 'menu': {
      const localRouteList = flatArray(localRoutes, children)
      // 菜单显示列表
      const menuList = getMenuList(powerRoutes, localRouteList, key)
      // 菜单排序
      const sortMenuList = sortMenu(menuList)
      return sortMenuList
    }
    default: {
      const localRouteList = flatArray(localRoutes, children)
      // 菜单显示列表
      const menuList = getMenuList(powerRoutes, localRouteList, key)
      // 菜单排序
      const sortMenuList = sortMenu(menuList)
      return new Promise((reject) => {
        const result = {
          accessibleRoutes,
          menuList: sortMenuList,
        }
        reject(result)
      })
    }
  }
}
