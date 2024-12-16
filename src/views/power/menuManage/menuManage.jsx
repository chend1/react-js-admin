import './menuManage.less'
import { useEffect, useState } from 'react'
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Modal,
  Form,
  Select,
  Radio,
  message,
} from 'antd'
import { getMenuList, addMenu, editMenu, delMenu } from '@/api'
import { flatArray } from '@/utils'

function menuManage() {
  const [menuList, setMenuList] = useState([])
  const [menuOptions, setMenuOptions] = useState([])
  const [keyword, setKeyword] = useState('')

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path',
      align: 'center',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div className="operation">
          <Button
            type="primary"
            onClick={() => handleEditMenu(record)}
            style={{ marginRight: '10px' }}
            size="small"
          >
            编辑
          </Button>
          <Button
            type="primary"
            ghost
            onClick={() => handleAddMenu(record.id)}
            style={{ marginRight: '10px' }}
            size="small"
          >
            添加子菜单
          </Button>
          <Popconfirm
            title="Title"
            description="确认删除该菜单吗！"
            onConfirm={() => handleDeleteMenu(record)}
          >
            <Button
              danger
              size="small"
              style={{ marginRight: '10px' }}
              disabled={record.children.length > 0}
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]
  const getMenuListFn = async () => {
    const res = await getMenuList({ keyword })
    setMenuList(res.list)
    setMenuOptions(flatArray(res.list))
  }

  useEffect(() => {
    getMenuListFn()
  }, [])

  const [menuInfo, setMenuInfo] = useState({ status: 1 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const handleAddMenu = (pid = 0) => {
    setMenuInfo({ status: 1, parent_id: pid })
    form.resetFields()
    form.setFieldsValue({ status: 1, parent_id: pid })
    setIsModalOpen(true)
  }

  const handleEditMenu = (record) => {
    form.setFieldsValue({ ...record })
    setMenuInfo(record)
    setIsModalOpen(true)
  }

  const handleConfirm = async () => {
    form.validateFields().then(async (values) => {
      if (menuInfo.id) {
        await editMenu(menuInfo)
        message.success('修改成功')
      } else {
        await addMenu(values)
        message.success('新增成功')
      }
      getMenuListFn()
      setIsModalOpen(false)
    })
  }

  const handleDeleteMenu = async (record) => {
    await delMenu({ id: record.id })
    message.success('删除成功')
    getMenuListFn()
  }

  return (
    <>
      <div className="menu-manage">
        <div className="menu-head">
          <div className="title">菜单管理</div>
          <div className="search">
            <div className="input">
              <Input
                placeholder="请输入菜单名称"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="btn">
              <Button type="primary" onClick={getMenuListFn}>
                查询
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: '10px' }}
                onClick={() => handleAddMenu(0)}
              >
                新增菜单
              </Button>
            </div>
          </div>
        </div>
        <div className="table">
          <Table
            columns={columns}
            dataSource={menuList}
            bordered
            size="middle"
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>
      <Modal
        title={menuInfo.id ? '编辑菜单' : '新增菜单'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleConfirm}
        maskClosable={false}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          labelAlign="right"
          name="accountForm"
          style={{ marginTop: '30px' }}
          onFinish={handleConfirm}
          onFinishFailed={(error) => console.log('error', error)}
          onValuesChange={(changedValues) => {
            setMenuInfo({ ...menuInfo, ...changedValues })
          }}
        >
          <Form.Item
            label="上级菜单"
            name="parent_id"
            rules={[{ required: true, message: '请选择上级菜单' }]}
          >
            <Select
              placeholder="请选择上级菜单"
              showSearch
              filterOption={(input, option) => {
                return (
                  (option?.children ?? '')
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                )
              }}
            >
              <Select.Option value={0}>无</Select.Option>
              {menuOptions.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="菜单名称"
            name="title"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item
            label="访问路径"
            name="path"
            rules={[{ required: true, message: '请输入菜单路径' }]}
          >
            <Input placeholder="请输入菜单路径" />
          </Form.Item>
          <Form.Item label="排序" name="sort">
            <Input type="sort" placeholder="请输入排序" />
          </Form.Item>
          <Form.Item label="是否启用" name="status">
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default menuManage
