import { useState, useEffect } from 'react'
import { Tree } from 'antd'
import { getMenuList } from '@/api'
import { flatArray } from '@/utils'
function authRole({ roleInfo, authRef }) {
  const [menuList, setMenuList] = useState([])
  const [menuOptions, setMenuOptions] = useState([])
  const [checkedKeys, setCheckedKeys] = useState([])

  useEffect(() => {
    getMenuListFn()
    if (roleInfo.menuList) {
      setCheckedKeys([...roleInfo.menuList])
    } else {
      setCheckedKeys([])
    }
  }, [])
  const getMenuListFn = async () => {
    const res = await getMenuList()
    setMenuList(res.list)
    const options = flatArray(res.list)
    setMenuOptions(options)
  }

  // 获取所有父级id
  const getParentId = (id) => {
    const parentIds = []
    const parent = menuOptions.find((item) => item.id === id)
    parentIds.push(parent.id)
    if (parent.parent_id && parent.parent_id !== 0) {
      const ids = getParentId(parent.parent_id)
      parentIds.push(...ids)
    }
    return parentIds
  }

  // 判断同子集是否全部未选中，全部未选中返回父级
  const checkChildren = (id, checks) => {
    const parentIds = []
    const options = flatArray(menuList)
    const menu = options.find((item) => item.id === id)
    const children = menu.children
    if (children.length) {
      const ids = children.map((item) => item.id)
      const checked = checks.filter((item) => ids.includes(item))
      if (checked.length <= 0) {
        parentIds.push(id)
        if (menu.parent_id && menu.parent_id !== 0) {
          const res = checkChildren(menu.parent_id, parentIds)
          parentIds.push(...res)
        }
        return parentIds
      } else {
        return []
      }
    } else {
      return []
    }
  }

  const onChange = (checks, e) => {
    // console.log('checks', checks, e)
    const { checkedNodes, node, checked } = e
    const checkedKeys = checkedNodes.map((item) => item.id)
    const list = new Set([...checkedKeys])
    // 扁平化
    const childrenList = flatArray(node.children)
    if (checked) {
      // 判断是否有父级
      const parentId = node.parent_id
      if (parentId) {
        const parentIds = getParentId(parentId)
        parentIds.forEach((id) => {
          list.add(id)
        })
      }
      // 判断是否有子级
      if (childrenList.length) {
        const ids = childrenList.map((item) => item.id)
        ids.forEach((item) => {
          list.add(item)
        })
      }
      const selectList = Array.from(list)
      authRef.current = selectList
      setCheckedKeys(selectList)
    } else {
      // 判断是否有子级
      if (childrenList.length) {
        const ids = childrenList.map((item) => item.id)
        ids.forEach((item) => {
          list.delete(item)
        })
      }
      // 判断父级是否需要取消选中
      const parentId = node.parent_id
      if (parentId) {
        const checkList = Array.from(list)
        const ids = checkChildren(parentId, checkList)
        if (ids.length) {
          ids.forEach((item) => {
            list.delete(item)
          })
        }
      }
      const selectList = Array.from(list)
      authRef.current = selectList
      setCheckedKeys(selectList)
    }
  }
  return (
    <div className="auth-role">
      {menuList.length > 0 && (
        <Tree
          checkable
          fieldNames={{ title: 'title', key: 'id', children: 'children' }}
          checkedKeys={checkedKeys}
          treeData={menuList}
          defaultExpandAll
          checkStrictly
          onCheck={onChange}
        />
      )}
    </div>
  )
}

export default authRole
