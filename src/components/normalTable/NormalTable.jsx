import React, {useEffect, useState} from "react";
import './normalTable.css'
import {Button, Col, Form, Input, message, Row, Select, Space, Table, Tag, theme, DatePicker} from "antd";
import Search from "antd/es/input/Search";
import {DownOutlined, FileExcelOutlined, PrinterOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import {reqDeleteRows, reqQueryTable} from "../../api/table";

export default () => {
    const { RangePicker } = DatePicker;
    const [tableData, setTableData] = useState([]);
    const [formInitValues, setFormInitValues] = useState({});
    let selectedArr = []
    const getTableData = async () => {
        let respTableData = await reqQueryTable(null,'/users/list');
        setTableData(respTableData.d)
    }
    useEffect(() => {
        getTableData()
    }, []);

    const columns = [
        {
            title: 'Nickname',
            dataIndex: 'nickname',
            key: 'nickname',
            align : 'center'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            align : 'center',

        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            align : 'center',

            key: 'mobile',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            align : 'center',

        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            align : 'center',

            render: text => text ? 'male' : 'female'
        },
        {
            title: 'Last Login',
            dataIndex: 'lastLogin$',
            key: 'lastLogin',
            align : 'center',

        },
        {
            title: 'Action',
            key: 'action',
            align : 'center',
            fixed: 'right',
            render: (_, value) => {
                return (
                    <Space size="middle">
                        <a>Modify</a>
                    </Space>
                )
            },
        },
    ];




    const AdvancedSearchForm = () => {
        const {token} = theme.useToken();
        const [form] = Form.useForm();
        const formStyle = {
            maxWidth: 'none',
            background: token.colorFillAlter,
            borderRadius: token.borderRadiusLG,
            paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24,
        };
        const getFields = () => {
            const children = [];
            children.push(
                <Col span={6} key={'1'}>
                    <Form.Item
                        name={`nickname`}
                    >
                        <Input placeholder="Nickname"/>
                    </Form.Item>
                </Col>,
                <Col span={6} key={'2'}>
                    <Form.Item
                        name={`username`}
                    >
                        <Input placeholder="Username"/>
                    </Form.Item>
                </Col>,
                <Col span={6} key={'5'}>
                    <Form.Item
                        name={`gender`}

                    >
                        <Select
                            placeholder="gender"
                            options={[
                                {
                                  value:null,
                                  label:null
                                },
                                {
                                    value: false,
                                    label: 'Female',
                                },{
                                    value: true,
                                    label: 'Male',
                                },

                            ]}
                        />
                    </Form.Item>
                </Col>,
                <Col span={6} key={'6'}>
                    <Form.Item
                        name={`last_login`}

                    >
                        <RangePicker />
                    </Form.Item>
                </Col>,

            );
            return children;
        };
        const onFinish = async (values) => {

            let reqQueryTable1 = await reqQueryTable(values,'/users/list');

            setTableData(reqQueryTable1.d)
            setFormInitValues(values)
        };
        return (
            <Form form={form} name="advanced_search"  style={formStyle}   onFinish={onFinish} initialValues={formInitValues} >
                <Row>
                    <Col span={20}>
                        <Row gutter={24}>
                            {getFields()}
                        </Row>
                    </Col>
                    <Col span={4}>
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
                                        onFinish({})
                                    }}
                                >
                                    Clear
                                </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>


            </Form>
        );
    };

    const handleAdd = () => {
        const newData = {
            key: (tableData.length + 1) +'',

        };
        setTableData([newData, ...tableData ]);
    };
    const x = async () => {
        if (selectedArr.length === 0) {
            message.error("You have to choose rows.")
        }
        let tableData = await reqDeleteRows(selectedArr,'/users/delete')
        let reqQueryTable1 = await reqQueryTable(formInitValues,'/users/list');
        setTableData(reqQueryTable1.d)
        setFormInitValues(formInitValues)
        message.success(tableData.msg)
    }
    const handleDelete = () => {

        x()

    }

    const onChange = (_,selectedRows) => {
        selectedArr = selectedRows
    }
    return (
        <div className={'normalTable'}>
            <AdvancedSearchForm/>
            <div className={'table-part'}>
                <div className={'operation'}>
                    <div className="operation-normal">
                        <Button type="primary" size={'middle'} onClick={handleAdd}>Add</Button>

                        <Button danger type="primary" size={'middle'} onClick={handleDelete}>Delete</Button>
                    </div>
                    <div className="operation-output" span={12}>
                        <Button size={"middle"} shape="circle" icon={<FileExcelOutlined/>}/>
                        <Button size={"middle"} shape="circle" icon={<PrinterOutlined/>}/>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    bordered={true}
                    className={'main-table'}
                    size={"small"}
                    rowSelection={{
                        fixed:true,
                        onChange
                    }}
                />
            </div>
        </div>
    )
}