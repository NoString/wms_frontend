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
import MultiAddModal from "./multiAddModal/MultiAddModal";
import MultiEditModal from "./multiEditModal/MultiEditModal";


const DynamicTable = () => {

    const ExportJsonExcel = require("js-export-excel");
    let pathName = window.location.pathname.split('/')[1]


    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    const {RangePicker} = DatePicker;



    //后端传来的data
    const [tableData, setTableData] = useState([]);

    //页面是否正在从后台加载数据
    const [pageLoading, setPageLoading] = useState(true);

    //是否显示add弹出层
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    //是否显示Edit弹出层
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    //多选框选中的arr
    const [selectedArr, setSelectedArr] = useState([]);

    //多选框选中的key
    const [selectedKeys, setSelectedKeys] = useState([]);


    const getTableData = async () => {
        let respTableData = await reqQueryTable(null, '/users/list');
        setPageLoading(false)
        setTableData(respTableData.d)
    }

    const reloadTable = async () => {
        let result = await reqQueryTable({}, '/users/list');
        setSelectedKeys([])
        setTableData(result.d)

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
            dataIndex: 'gender$',
            key: 'gender',
            align: 'center',

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
        setIsAddModalOpen(true);
    };


    const handleEditButton = async () => {
        if (selectedArr.length <= 0) {
            message.error("You must choose one row!")
            return;
        }
        if (selectedArr.length > 10) {
            message.error("The choice of maximum is 10 rows.")
            return;
        }
        const newFormData = {};

        selectedArr.map((data, index) => {
            for (let dataKey in data) {
                newFormData[dataKey + "-" + index] = data[dataKey]
            }
        })

        setIsEditModalOpen(true)

    }


    const handleDelete = async () => {
        if (selectedArr.length === 0) {
            message.error("You must choose one row!")
            return
        }
        let tableData = await reqDeleteRows(selectedArr, '/users/delete')
        reloadTable()
        message.success(tableData.msg)
    }


    const tableSelectChange = (key,selectedRows) => {
        setSelectedKeys(key)
        setSelectedArr(selectedRows)
    }

    const exportExcel = () => {
      if (selectedArr.length <= 0 ){
          message.error("Please, choose at least one row")
          return
      }
        let excelColumns = []
        let sheetData = []
        for (let i = 0; i < columns.length; i++) {
            excelColumns.push(columns[i].dataIndex)
        }

        selectedArr.map((obj) =>{
            let excelObj = {}
            excelColumns.map((key) =>{

                excelObj[key] = obj[key]
            })
            sheetData.push(excelObj)
        })
        let option  = {};
        // 文件名
        option.fileName = pathName;
        // excel的数据
        option.datas = [
            {
                sheetName: pathName,
                sheetData: sheetData,
                sheetFilter: excelColumns,
                sheetHeader: excelColumns,
                columnWidths: [10,10,10,10]
            }
        ]
        // 创建实例
        let toExcel = new ExportJsonExcel(option);
        // 保存下载excel
        toExcel.saveExcel();
    }

    const exportPrint = () => {
        window.print()
    }

    return (
        <div className={'normalTable'}>
            <AdvancedSearchForm/>
            <div className={'table-part'}>
                <div className={'operation'}>
                    <div className="operation-normal">
                        <Button type="primary" size={'middle'} onClick={handleAddButton}>Add</Button>
                        <Button type="primary" size={'middle'} style={{backgroundColor: 'lightseagreen'}}
                                onClick={handleEditButton}>Edit</Button>
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
                        <Button size={"middle"} shape="circle" icon={<FileExcelOutlined/>} onClick={exportExcel}/>
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
                        onChange : tableSelectChange,
                        selectedRowKeys : selectedKeys,
                    }}
                />
            </div>

            <MultiAddModal isOpen={isAddModalOpen} changeOpen={() => setIsAddModalOpen(!isAddModalOpen)} reloadTable={reloadTable}/>


            {
                // 必须通过这种方式强制重载组件,否则组件不会重载,而Form表单的默认值只会加载第一次传来的参数
                isEditModalOpen === false ? (<div></div>) : (
                    <MultiEditModal isOpen={isEditModalOpen} changeOpen = {() => setIsEditModalOpen(!isEditModalOpen)} datas={selectedArr} reloadTable={reloadTable} />
                )
            }

        </div>
    )
}
export default DynamicTable