import './accountManage.less'
import { useState, useEffect } from 'react'
import {
  Input,
  Button,
  Table,
  Modal,
  Form,
  Radio,
  Select,
  message,
  Popconfirm,
} from 'antd'
import {
  getUserList,
  addUser,
  editUser,
  delUser,
  resetPassword,
  getRoleList,
} from '@/api'
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
      align: 'center',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
      align: 'center',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (text, record) => {
        return roleList.find((item) => item.id === record.role)?.name
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, record) => {
        return record.status === 1 ? '启用' : '禁用'
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (text, record) => (
        <div className="operation">
          <Button
            type="primary"
            onClick={() => handleEditUser(record)}
            style={{ marginRight: '10px' }}
            size="small"
          >
            编辑
          </Button>
          <Popconfirm
            title="Title"
            description="确认删除该账号吗！"
            onConfirm={() => handleDeleteUser(record)}
          >
            <Button danger size="small" style={{ marginRight: '10px' }}>
              删除
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Title"
            description="确定重置该账号密码吗！"
            onConfirm={() => handleResetPassword(record)}
          >
            <Button color="danger" variant="dashed" size="small">
              重置密码
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]
  const getUserListFn = async () => {
    const { list, count } = await getUserList(searchInfo)
    const data = list.map((item) => {
      return {
        key: item.id,
        ...item,
      }
    })
    setUserList(data)
    setTotal(count)
  }

  const [roleList, setRoleList] = useState([])
  const getRoleListFn = async () => {
    const { list } = await getRoleList()
    console.log('list', list)

    setRoleList(list)
  }
  useEffect(() => {
    getRoleListFn()
    getUserListFn()
  }, [])

  const [userInfo, setUserInfo] = useState({ status: 1 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const handleAddUser = () => {
    setUserInfo({ status: 1 })
    form.resetFields()
    form.setFieldsValue({ status: 1 })
    setIsModalOpen(true)
  }

  const handleEditUser = (record) => {
    form.setFieldsValue({ ...record })
    setUserInfo({ ...record })
    setIsModalOpen(true)
  }

  const handleConfirm = async () => {
    form.validateFields().then(async (values) => {
      if (userInfo.id) {
        await editUser(userInfo)
        message.success('修改成功')
      } else {
        await addUser(values)
        message.success('新增成功')
      }
      getUserListFn()
      setIsModalOpen(false)
    })
  }

  const handleDeleteUser = async (record) => {
    await delUser({ id: record.id })
    message.success('删除成功')
    getUserListFn()
  }

  const handleResetPassword = async (record) => {
    await resetPassword({ id: record.id })
    message.success('重置密码成功')
  }

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
              <Button
                type="primary"
                style={{ marginLeft: '10px' }}
                onClick={handleAddUser}
              >
                新增账号
              </Button>
            </div>
          </div>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={userList}
            bordered
            size="middle"
            pagination={{
              total,
              align: 'center',
              pageSize: searchInfo.size,
              showTotal: (total) => `共 ${total} 条`,
              pageSizeOptions: ['5', '10', '15', '20'],
              showSizeChanger: true,
              onShowSizeChange: (current, size) => {
                setSearchInfo({ ...searchInfo, size })
                getUserListFn()
              },
            }}
          />
        </div>
      </div>
      <Modal
        title={userInfo.id ? '编辑账号' : '新增账号'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOk={handleConfirm}
        maskClosable={false}
      >
        {/* initialValues 的使用无法在新增时重置为空，需要打开两次弹窗，所以弃用 */}
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          labelAlign="right"
          name="accountForm"
          style={{ marginTop: '30px' }}
          onFinish={handleConfirm}
          onFinishFailed={(error) => console.log('error', error)}
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              placeholder="请输入用户名"
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="账号"
            name="account"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input
              placeholder="请输入字母或数字"
              disabled={userInfo.id}
              onChange={(e) =>
                setUserInfo({ ...userInfo, account: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select
              onChange={(value) => setUserInfo({ ...userInfo, role: value })}
              options={roleList.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          {!userInfo.id && (
            <Form.Item label="密码" name="password">
              <Input type="password" placeholder="不修改请留空" />
            </Form.Item>
          )}
          <Form.Item label="是否启用" name="status">
            <Radio.Group
              onChange={(e) =>
                setUserInfo({ ...userInfo, status: e.target.value })
              }
            >
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default accountManage
