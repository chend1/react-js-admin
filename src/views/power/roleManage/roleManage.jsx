import './roleManage.less'
import { useState, useEffect, useRef } from 'react'
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
import { getRoleList, addRole, editRole,authRole, delRole } from '@/api'
import AuthRole from './components/AuthRole'

function ruleManage() {
  const [searchInfo, setSearchInfo] = useState({
    page: 1,
    size: 20,
    keyword: '',
  })
  const [total, setTotal] = useState([])
  const [roleList, setRoleList] = useState([])
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
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
            onClick={() => handleEditRole(record)}
            style={{ marginRight: '10px' }}
            size="small"
          >
            编辑
          </Button>
          <Button
            type="primary"
            ghost
            onClick={() => handleAuth(record)}
            style={{ marginRight: '10px' }}
            size="small"
          >
            授权
          </Button>
          <Popconfirm
            title="Title"
            description="确认删除该角色吗！"
            onConfirm={() => handleDeleteRole(record)}
          >
            <Button danger size="small" style={{ marginRight: '10px' }}>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]
  const getRoleListFn = async () => {
    const res = await getRoleList(searchInfo)
    console.log('res', res)

    setRoleList(res.list)
  }
  useEffect(() => {
    getRoleListFn()
  }, [searchInfo])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roleInfo, setRoleInfo] = useState({})
  const [form] = Form.useForm()
  const handleAddRole = () => {
    setRoleInfo({ status: 1 })
    form.resetFields()
    form.setFieldsValue({ status: 1 })
    setIsModalOpen(true)
  }

  const handleEditRole = (info) => {
    setRoleInfo(info)
    form.setFieldsValue({ ...info })
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    form.validateFields().then(async (values) => {
      if (roleInfo.id) {
        await editRole(roleInfo)
        message.success('修改成功')
      } else {
        await addRole(roleInfo)
        message.success('新增成功')
      }
      getRoleListFn()
      setIsModalOpen(false)
    })
  }

  const handleDeleteRole = async (info) => {
    await delRole({ id: info.id })
    message.success('删除成功')
    getRoleListFn()
  }

  // 角色授权
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false)

  const authRef = useRef(null)
  const handleAuth = (info) => {
    setRoleInfo(info)
    setIsAuthModalVisible(true)
  }
  const handleAuthConfirm = async () => {
    console.log('authRef', authRef.current);
    await authRole({ id: roleInfo.id, auths: JSON.stringify(authRef.current) })
    message.success('授权成功')
    getRoleListFn()
    setIsAuthModalVisible(false)
  }
  return (
    <>
      <div className="role-manage">
        <div className="role-head">
          <div className="title">角色管理</div>
          <div className="search">
            <div className="input">
              <Input
                placeholder="请输入角色名称"
                value={searchInfo.keyword}
                onChange={(e) =>
                  setKeyword({ ...searchInfo, keyword: e.target.value })
                }
              />
            </div>
            <div className="btn">
              <Button type="primary" onClick={getRoleListFn}>
                查询
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: '10px' }}
                onClick={() => handleAddRole()}
              >
                新增菜单
              </Button>
            </div>
          </div>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={roleList}
            bordered
            size="middle"
            rowKey="id"
            pagination={{
              total,
              align: 'center',
              pageSize: searchInfo.size,
              showTotal: (total) => `共 ${total} 条`,
              pageSizeOptions: ['5', '10', '15', '20'],
              showSizeChanger: true,
              onShowSizeChange: (current, size) => {
                setSearchInfo({ ...searchInfo, size })
              },
            }}
          />
        </div>
      </div>
      <Modal
        title={roleInfo.id ? '编辑角色' : '新增角色'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOk={handleConfirm}
        maskClosable={false}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          labelAlign="right"
          name="roleForm"
          style={{ marginTop: '30px' }}
          onFinish={handleConfirm}
          onFinishFailed={(error) => console.log('error', error)}
          onValuesChange={(changedValues) => {
            setRoleInfo({ ...roleInfo, ...changedValues })
          }}
        >
          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item label="是否启用" name="status">
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="角色授权"
        open={isAuthModalVisible}
        onCancel={() => {
          setIsAuthModalVisible(false)
        }}
        onOk={handleAuthConfirm}
        maskClosable={false}
        destroyOnClose
      >
        <AuthRole
          roleInfo={roleInfo}
          authRef={authRef}
          setIsAuthModalVisible={setIsAuthModalVisible}
        />
      </Modal>
    </>
  )
}

export default ruleManage
