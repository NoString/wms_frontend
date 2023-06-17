import React, {createRef, useEffect, useRef, useState} from "react";
import './dynamicTable.css'
import {
    Button,
    Col,
    Input,
    message,
    Row,
    Select,
    Space,
    Table,
    Tag,
    theme,
    DatePicker,
    Popconfirm,
    InputNumber, Modal, Pagination, Carousel, Calendar, Divider, Form
} from "antd";
import Search from "antd/es/input/Search";
import {DownOutlined, FileExcelOutlined, PrinterOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import {reqDeleteRows, reqQueryTable} from "../../api/table";
import InputSelect from "../inputSelect/InputSelect";
import {reqInputSelect} from "../../api/inputSelect";
import {useToken} from "antd/es/theme/internal";
import {useForm} from "antd/es/form/Form";
import MultiAddModal from "./multiAddButton/MultiAddModal";


const DynamicTable = () => {
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    const {RangePicker} = DatePicker;
    //后端传来的data
    const [tableData, setTableData] = useState([]);

    const [formInitValues, setFormInitValues] = useState({});

    //页面是否正在从后台加载数据
    const [pageLoading, setPageLoading] = useState(true);

    //是否显示add和edit弹出层
    const [isModalOpen, setIsModalOpen] = useState(false);

    //add和edit时的总页数
    const [modalFormCount, setModalFormCount] = useState(1);

    const [modalFormCurrent, setModalFormCurrent] = useState(1);

    //多选框选中的arr
    const [selectedArr, setSelectedArr] = useState([]);

    //是否为添加data
    const [isAddData, setIsAddData] = useState(true);


    const getTableData = async () => {
        let respTableData = await reqQueryTable(null, '/users/list');
        setPageLoading(false)
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
            align: 'center'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            align: 'center',

        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            align: 'center',
            key: 'mobile',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            align: 'center',

        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            align: 'center',
            render: text => text === undefined ? '' : text === true ? 'male' : 'female'
        },
        {
            title: 'Last Login',
            dataIndex: 'lastLogin$',
            key: 'last_login',
            align: 'center',

        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            align: 'center',

        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
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


    const [modalForm] = Form.useForm()
    const AdvancedModalForm = (key) => {
        return (
            <div key={key}>
                {}
                <Form.Item
                    label="Nickname"
                    name={["nickname-" + key]}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                        },
                    ]}
                >
                    <Input/>


                </Form.Item>

                <Form.Item
                    label="Username"
                    name={["username-" + key]}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>

                </Form.Item>

                <Form.Item
                    label="Mobile"
                    name={"mobile-" + key}
                >
                    <Input/>
                </Form.Item>


                <Form.Item
                    label="Password"
                    name={"password-" + key}

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input/>

                </Form.Item>
                <Form.Item
                    name={`gender-` + key}
                    label={'Gender'}
                >
                    <Select

                        placeholder="gender"

                        options={[

                            {
                                value: null,
                                label: ''
                            },
                            {
                                value: false,
                                label: 'Female',
                            }, {
                                value: true,
                                label: 'Male',
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                   name={`role_id-` + key}
                    label={'role'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your role!',
                        },
                    ]}
                >
                <Input/>
                    <InputSelect />
                </Form.Item>

            </div>

        )
    }

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
                <Col span={6} key={'3'}>
                    <Form.Item
                        name={`gender`}

                    >
                        <Select
                            placeholder="gender"
                            options={[
                                {
                                    value: null,
                                    label: null
                                },
                                {
                                    value: false,
                                    label: 'Female',
                                }, {
                                    value: true,
                                    label: 'Male',
                                },

                            ]}
                        />
                    </Form.Item>
                </Col>,
                <Col span={6} key={'4'}>
                    <Form.Item
                        name={`last_login`}>
                        <RangePicker/>
                    </Form.Item>
                </Col>,
                <Col span={6} key={'5'}>
                    <Form.Item
                        name={`all`}>
                        <Input placeholder="all"/>
                    </Form.Item>
                </Col>,
                <Col span={6} key={'6'}>
                    <Form.Item
                        name={`role_id`}>
                        <InputSelect/>
                    </Form.Item>
                </Col>,
            );
            return children;
        };
        const handleSearch = async (values) => {


            //模糊搜索,把所有前台展示columns发送回后台做sql拼接
            if (values.all !== undefined) {
                let searchColumns = [];
                columns.forEach((i) => {
                    searchColumns.push(i.key)
                })
                values.columns = searchColumns + '';
            }

            //格式化antd时间选择器内容

            for (let value in values) {
                if (values[value] instanceof Array) {
                    values[value + '_date'] = values[value] + ''
                    values[value] = undefined
                }
            }


            let reqQueryTable1 = await reqQueryTable(values, '/users/list');
            setTableData(reqQueryTable1.d)
        };
        return (
            <Form form={form} name="advanced_search" style={formStyle} onFinish={handleSearch}
            >
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
                                        handleSearch({})
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

    const handleAddButton = () => {
        // setIsModalOpen(true);
        setIsModalOpen(true);


        // setModalFormContentPages([AdvancedModalForm(modalFormCount + '')])
    };


    const handleDelete = async () => {
        if (selectedArr.length === 0) {
            message.error("You must choose one row!")
            return
        }
        let tableData = await reqDeleteRows(selectedArr, '/users/delete')
        let reqQueryTable1 = await reqQueryTable(formInitValues, '/users/list');
        setTableData(reqQueryTable1.d)
        setFormInitValues(formInitValues)
        message.success(tableData.msg)
    }


    const onChange = (_, selectedRows) => {
        setSelectedArr(selectedRows)
    }


    const [modalFormContentPages, setModalFormContentPages] = useState([]);
    const carouselRef = useRef();
    const modalClose = async () => {
        setIsModalOpen(false);
        setModalFormContentPages([])
        setModalFormCount(1)
        setModalFormCurrent(1)
        setModalFormData({})
    }
    const modalMore = async () => {
        if (modalFormCount >= 10) {
            message.error('The pages can not be more than TEN !')
            return;
        }
        let nowCurrent = modalFormCount + 1;
        setModalFormCount(nowCurrent)
        setModalFormCurrent(nowCurrent)
        await setModalFormContentPages([...modalFormContentPages, AdvancedModalForm(nowCurrent + '')])
        carouselRef.current.goTo(nowCurrent - 1);
    }

    const modalFormIndexChange = (page, pageSize) => {
        setModalFormCurrent(page)
        carouselRef.current.goTo(page - 1);
    }


    const handleDotChange = (current) => {
        setModalFormCurrent(current + 1)
    }

    const modalButtons = [
        <Pagination
            key={'pagination'}
            simple
            defaultCurrent={1}
            defaultPageSize={1}
            current={modalFormCurrent}
            total={modalFormCount}
            size={"small"}
            style={{paddingBottom: "20px"}}
            hideOnSinglePage={true}
            onChange={modalFormIndexChange}
        />,
        <Button key="more"
                size={"middle"}
                onClick={modalMore}
                type={"primary"}
                style={{backgroundColor: 'lightseagreen'}}
        >
            More
        </Button>,
        <Button key="save"
                size={"middle"}
                type={"primary"}
                onClick={() => {
                    modalForm.submit()
                }}

        >

            Save
        </Button>,
    ]
    const newFormData = {};
    const [modalFormData, setModalFormData] = useState({});

    const handleEdit = async () => {
        if (selectedArr.length <= 0) {
            message.error("You must choose one row!")
            return;
        }
        if (selectedArr.length > 10) {
            message.error("The choice of maximum is 10 rows.")
            return;
        }
        let pages = []
        selectedArr.map((data, index) => {
            for (let dataKey in data) {
                newFormData[dataKey + "-" + index] = data[dataKey]
            }
            pages.push(AdvancedModalForm(index + ''))
        })
        setModalFormData(newFormData)
        setIsModalOpen(true);
        setModalFormContentPages([...pages])
        setModalFormCount(selectedArr.length)
        setModalFormCurrent(1)


    }
    const modalSubmit = (data) => {
        let parseData = []
        for (let i = 0; i < modalFormCount; i++) {
            parseData.push({})
        }
        for (let dataKey in data) {
            let splitData = dataKey.split("-");
        }
    }


    return (
        <div className={'normalTable'}>
            <AdvancedSearchForm/>
            <div className={'table-part'}>
                <div className={'operation'}>
                    <div className="operation-normal">
                        <Button type="primary" size={'middle'} onClick={handleAddButton}>Add</Button>
                        <Button type="primary" size={'middle'} style={{backgroundColor: 'lightseagreen'}}
                                onClick={handleEdit}>Edit</Button>
                        <Popconfirm
                            title="Delete rows"
                            description="Are you sure to delete the rows?"
                            onConfirm={handleDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger type="primary" size={'middle'}>Delete</Button>
                        </Popconfirm>
                    </div>
                    <div className="operation-output" span={12}>
                        <Button size={"middle"} shape="circle" icon={<FileExcelOutlined/>}/>
                        <Button size={"middle"} shape="circle" icon={<PrinterOutlined/>}/>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    className={'main-table'}
                    loading={pageLoading}
                    size={"small"}

                    bordered
                    pagination={{
                        hideOnSinglePage: true,
                        size: "default"
                    }}
                    rowSelection={{
                        fixed: true,
                        onChange
                    }}
                />
            </div>

            <MultiAddModal isOpen={isModalOpen} changeOpen={() => setIsModalOpen(!isModalOpen)} />
            <Modal
                open={false}
                footer={modalButtons}
                onCancel={modalClose}
                maskClosable={false}
                destroyOnClose={true}
            >
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    name="advanced_modal"
                    labelAlign={'right'}
                    form={modalForm}
                    onFinish={modalSubmit}
                    preserve={false}
                    initialValues={modalFormData}
                >
                    <Divider orientation={"left"}>Add {window.location.pathname.split('/')[1]}</Divider>

                    <Carousel dots={false} ref={carouselRef}
                              afterChange={handleDotChange}
                    >
                        {modalFormContentPages.map((item) => {
                            console.log(isAddData);
                            return (item)
                        })}
                    </Carousel>
                </Form>
            </Modal>
        </div>
    )
}
export default DynamicTable