import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, InputNumber, Modal, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {useForm} from "antd/es/form/Form";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, open }) => {
    const prevOpenRef = useRef();
    useEffect(() => {
        prevOpenRef.current = open;
    }, [open]);
    const prevOpen = prevOpenRef.current;
    useEffect(() => {
        if (!open && prevOpen) {
            form.resetFields();
        }
    }, [form, prevOpen, open]);
};
const ModalForm = ({ open, onCancel }) => {
    const [form] = Form.useForm();
    useResetFormOnCloseModal({
        form,
        open,
    });
    const onOk = () => {
        console.log(form);
        form.submit();
    };
    return (
        <Modal title="Basic Drawer" open={open} onOk={onOk} onCancel={onCancel}>
            <Form form={form} layout="vertical" name="userForm">
                <Form.Item
                    name="name"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="User Age"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    );
};
const App = () => {
    const [form] = Form.useForm()

    const [open, setOpen] = useState(false);
    const showUserModal = () => {
        setOpen(true);
    };
    const hideUserModal = () => {
        setOpen(false);
    };
    const onFinish = (values) => {
        console.log('Finish:', values);
    };
    const checkForm = async (value1) => {
        console.log(value1);
        await console.log(form.validateFields());
    }
    return (
        <Form.Provider
            onFormFinish={(name, { values, forms }) => {
                if (name === 'userForm') {
                    const { basicForm } = forms;
                    const users = basicForm.getFieldValue('users') || [];
                    basicForm.setFieldsValue({
                        users: [...users, values],
                    });
                    setOpen(false);
                }
            }}
        >
            <Form
                {...layout}
                name="basicForm"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                form={form}
            >
                <Form.Item
                    name="group"
                    label="Group Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="User List"
                    shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
                >
                    {({ getFieldValue }) => {
                        const users = getFieldValue('users') || [];
                        return users.length ? (
                            <ul>
                                {users.map((user) => (
                                    <li key={user.name} className="user">
                                        <Avatar icon={<UserOutlined />} />
                                        {user.name} - {user.age}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography.Text className="ant-form-text" type="secondary">
                                ( <SmileOutlined /> No user yet. )
                            </Typography.Text>
                        );
                    }}
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                    <Button  type="primary" onClick={checkForm}>
                        check
                    </Button>
                    <Button
                        htmlType="button"
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={showUserModal}
                    >
                        Add User
                    </Button>
                </Form.Item>
            </Form>


            <ModalForm open={open} onCancel={hideUserModal} />
        </Form.Provider>
    );
};
export default App;