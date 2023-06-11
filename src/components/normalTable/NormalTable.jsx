import React, {useState} from "react";
import './normalTable.css'
import {Button, Col, Form, Input, Row, Select, Space, Table, Tag, theme} from "antd";
import Search from "antd/es/input/Search";
import {DownOutlined, FileExcelOutlined, PrinterOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import {reqQueryTable} from "../../api/table";

export default () => {
    const columns = [
        {
            title: 'Nickname',
            dataIndex: 'nickname',
            key: 'nickname',

        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => {
                return (<a>{text}</a>)
            },
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: text => text === 0 ? 'male' : 'female'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const getdata = async () => {
        let reqQueryTable1 = await reqQueryTable(null,'/users/list');
        return reqQueryTable1.d;
    }

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const AdvancedSearchForm = () => {
        const {token} = theme.useToken();
        const [form] = Form.useForm();
        const [expand, setExpand] = useState(false);
        const formStyle = {
            maxWidth: 'none',
            background: token.colorFillAlter,
            borderRadius: token.borderRadiusLG,
            padding: 24,
        };
        const getFields = () => {
            const count = expand ? 10 : 6;
            const children = [];
            for (let i = 0; i < count; i++) {
                children.push(
                    <Col span={8} key={i}>
                        {i % 3 !== 1 ? (
                            <Form.Item
                                name={`field-${i}`}
                                label={`Field ${i}`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input something!',
                                    },
                                ]}
                            >
                                <Input placeholder="placeholder"/>
                            </Form.Item>
                        ) : (
                            <Form.Item
                                name={`field-${i}`}
                                label={`Field ${i}`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Select something!',
                                    },
                                ]}
                                initialValue="1"
                            >
                                <Select>
                                    <Option value="1">
                                        longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                                    </Option>
                                    <Option value="2">222</Option>
                                </Select>
                            </Form.Item>
                        )}
                    </Col>,
                );
            }
            return children;
        };
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
        };
        return (
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                <Row gutter={24}>{getFields()}</Row>
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space size="small">
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                        <a
                            style={{
                                fontSize: 12,
                            }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            <DownOutlined rotate={expand ? 180 : 0}/> Collapse
                        </a>
                    </Space>
                </div>
            </Form>
        );
    };
    return (
        <div className={'normalTable'}>
            <AdvancedSearchForm/>
            <div className={'table-part'}>
                <div className={'operation'}>
                    <div className="operation-normal">
                        <Button type="primary">Add</Button>

                        <Button danger type="primary">Delete</Button>
                    </div>
                    <div className="operation-output" span={12}>
                        <Button size={"middle"} shape="circle" icon={<FileExcelOutlined/>}/>
                        <Button size={"middle"} shape="circle" icon={<PrinterOutlined/>}/>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered={true}
                    className={'main-table'}
                />
            </div>
        </div>
    )
}