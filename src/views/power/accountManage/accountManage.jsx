import './accountManage.less'
import { useState, useEffect } from 'react'
import { Input, Button, Table } from 'antd'
import { getUserList } from '@/api'
function accountManage() {
  const [userList, setUserList] = useState([])
  const [total, setTotal] = useState(0)
  const [searchInfo, setSearchInfo] = useState({
    keyword: '',
    page: 1,
    size: 20,
  })
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
    },
  ]
  const getUserListFn = async () => {
    const { list, count } = await getUserList(searchInfo)
    const data = list.map((item) => {
      return {
        key: item.id,
        name: item.name,
        account: item.account,
        create_time: item.create_time,
        operation: '操作',
      }
    })
    setUserList(data)
    setTotal(count)
  }

  useEffect(() => {
    getUserListFn()
  }, [searchInfo])
  return (
    <>
      <div className="account-manage">
        <div className="account-head">
          <div className="title">账号管理</div>
          <div className="search">
            <div className="input">
              <Input
                placeholder="请输入账号名称"
                value={searchInfo.keyword}
                onChange={(e) =>
                  setSearchInfo({ ...searchInfo, keyword: e.target.value })
                }
              />
            </div>
            <div className="btn">
              <Button type="primary" onClick={getUserListFn}>
                查询
              </Button>
            </div>
          </div>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={userList}
            pagination={{ total, align: 'center', pageSize: searchInfo.size }}
          />
        </div>
      </div>
    </>
  )
}

export default accountManage
