import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Modal, message, Form, Input, Drawer } from 'antd';
import { getStudentList, deleteStudent, searchStudent } from '@/api/apiList'
import { StepForwardOutlined } from '@ant-design/icons';
import Tettt from './test'

export default function StudentList() {
    const [form] = Form.useForm();

    const [newData, setNewData] = useState([])
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [initialVal, setInitialVal] = useState({})
    async function getList() {
        setLoading(true)
        const { data } = await getStudentList('/api/student/findAll?appkey=demo13_1545210570249')
        setLoading(false)
        const newArr = [];
        for (const item of data.data) {
            const obj = {}
            obj.name = item.name;
            obj.age = item.birth;
            obj.address = item.address;
            obj.key = item.id;
            obj.sNo = item.sNo;
            newArr.push(obj)
        }
        setNewData(newArr)
    }
    useEffect(() => {
        getList()
    }, [])
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleCheck = () => {

    }
    const handleDelete = async (id) => {
        Modal.confirm({
            content: `确定删除id为${id}的学生`,
            cancelText: '取消',
            okText: '确认',
            icon: <StepForwardOutlined />,
            onOk: async () => {
                try {
                    const { data } = await deleteStudent(`http://open.duyiedu.com/api/student/delBySno?appkey=demo13_1545210570249&sNo=${id}`)
                    if (data) {
                        message.success('删除成功～')
                        // 刷新 - 重新请求
                        getList()
                    }
                } catch (error) {
                    message.error('删除失败')
                }
            }
        })

    }


    const handleEdit = async (sNo) => {
        showDrawer()
        const { data } = await getStudentList(`/api/student/searchStudent?appkey=demo13_1545210570249&sex=-1&search=${sNo}&page=1&size=1`)
        const dataObj = data.data.searchList[0];
        const obj = {
            username: dataObj.name,
            address: dataObj.address,
            age: dataObj.birth
        }
        setInitialVal(obj)
        form.setFieldsValue(obj);
    }
    const onReset = () => {
        console.log(form.getFieldValue('username'), 'aaaaaa')
        form.resetFields();
    };
    // useEffect(() => {
    //     console.log(initialVal, 'initialValinitialVal')
    //     form.setFieldsValue({ username: '你好', address: '12', age: 1981 });
    // }, [initialVal]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                console.log(record, 'record');
                return <Space size="middle">
                    <Button onClick={handleCheck}>查看</Button>
                    <Button onClick={() => { handleEdit(record.sNo) }}>编辑</Button>
                    <Button onClick={() => { handleDelete(record.sNo) }}>删除</Button>
                </Space>
            },
        },
    ];

    return <>
        <div>
            <Tettt />
        </div>
        <div>
            <Table
                loading={loading}
                columns={columns}
                dataSource={newData} />
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={initialVal}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="name"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" onClick={() => {
                            onReset()
                        }}>
                            充值
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer >
        </div>
    </>

}