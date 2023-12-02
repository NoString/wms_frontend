import React, {useEffect, useState} from "react";
import './dynamicTable.css'
import {
    Button,
    Col,
    Input,
    message,
    Row,

    Space,
    Table,

    theme,

    Popconfirm,
    Form, Modal, Tooltip
} from "antd";
import {FileExcelOutlined} from "@ant-design/icons";
import {reqDeleteRows, reqQueryTable} from "../../api/table";
import EditModal from "./editModal/EditModal";
import AddModal from "./addModal/AddModal";
import login from "../../pages/login/Login";
import ajax from "../../api/ajax";


const DynamicTable = (props) => {

    const {prefixUrl, searchConfig, operationConfig, tableFields} = props.config

    const ExportJsonExcel = require("js-export-excel");
    let pathName = window.location.pathname.split('/')[1]


    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };


    //后端传来的data
    const [tableData, setTableData] = useState([]);

    //页面是否正在从后台加载数据
    const [loadingTableData, setLoadingTableData] = useState(true);

    //是否显示add弹出层
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    //是否显示Edit弹出层
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    //Edit的数据
    const [editData, setEditData] = useState({});
    //多选框选中的arr
    const [selectedArr, setSelectedArr] = useState([]);

    //多选框选中的key
    const [selectedKeys, setSelectedKeys] = useState([]);


    /****************************************初始化****************************************/

    const getTableData = async () => {

        let respTableData = await reqQueryTable(null, prefixUrl + '/list');
        setLoadingTableData(false)
        setTableData(respTableData.d)
    }

    const reloadTable = async () => {
        setLoadingTableData(true)
        let result = await reqQueryTable({}, prefixUrl + '/list');
        setSelectedKeys([])
        setTableData(result.d)
        setLoadingTableData(false)
    }


    useEffect(() => {
        getTableData()
    }, []);

    /****************************************search bar****************************************/
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
            searchConfig.searchField.map((item, index) => {
                let child;
                if (item.notInput === true) {
                    child = (
                        <Col span={6} key={index + ''}>
                            <Form.Item
                                name={`${item.name}`}
                            >
                                {
                                    item.code
                                }
                            </Form.Item>
                        </Col>
                    )

                } else {
                    child = (
                        <Col span={6} key={index + ''}>
                            <Form.Item
                                name={`${item.name}`}
                            >
                                <Input placeholder={`${item.placeholder}`}/>
                            </Form.Item>
                        </Col>
                    )
                }
                children.push(child)
            })

            return children;
        };
        const handleSearch = async (values) => {
            setLoadingTableData(true)

            //格式化antd时间选择器内容
            for (let value in values) {
                if (values[value] instanceof Array) {
                    values[value + '_date'] = values[value] + ''
                    values[value] = undefined
                }
            }
            let reqQueryTable1 = await reqQueryTable(values, prefixUrl + '/list');
            setTableData(reqQueryTable1.d)
            setLoadingTableData(false)
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

    /****************************************operation bar****************************************/




    const handleDelete = async () => {
        if (selectedArr.length === 0) {
            message.error("You must choose one row!")
            return
        }
        let tableData = await reqDeleteRows(selectedArr, prefixUrl + '/delete')
        reloadTable()
        message.success(tableData.msg)
    }


    const tableSelectChange = (key, selectedRows) => {
        setSelectedKeys(key)
        setSelectedArr(selectedRows)

    }

    const exportExcel = () => {
        if (selectedArr.length <= 0) {
            message.error("Please, choose at least one row")
            return
        }
        let excelColumns = []
        let sheetData = []
        let fields = getTableFields();
        for (let i = 0; i < fields.length; i++) {
            excelColumns.push(fields[i].dataIndex)
        }

        selectedArr.map((obj) => {
            let excelObj = {}
            excelColumns.map((key) => {

                excelObj[key] = obj[key]
            })
            sheetData.push(excelObj)
        })
        let option = {};
        // 文件名
        option.fileName = pathName;
        // excel的数据
        option.datas = [
            {
                sheetName: pathName,
                sheetData: sheetData,
                sheetFilter: excelColumns,
                sheetHeader: excelColumns,
                columnWidths: [10, 10, 10, 10]
            }
        ]
        // 创建实例
        let toExcel = new ExportJsonExcel(option);
        // 保存下载excel
        toExcel.saveExcel();
    }


    /****************************************table****************************************/
    const getTableFields = () => {
        let fields = []
        tableFields.map((value, index) => {

            let field = {};
            field.title = value.title

            field.key = value.dbName
            field.align = "center"

            if (value.render !== undefined) {
                field.render = value.render
            }else {
                field.dataIndex = value.javaName
            }

            //排序代码
            if (value.sort !== undefined) {
                switch (value.sort) {
                    case "str":
                        field.sorter = (a, b, c) => {
                            return a[value.javaName].length - b[value.javaName].length

                        }
                        break
                    case "num":
                        field.sorter = (a, b, c) => {
                            return a[value.javaName] - b[value.javaName]

                        }
                        break
                    case "date":
                        field.sorter = (a, b, c) => {
                            let preDate = new Date(a[value.javaName.split("$")[0]])
                            let nextDate = new Date(b[value.javaName.split("$")[0]])

                            return preDate - nextDate
                        }
                        break
                }
            }

            fields.push(field)
        })


        let field = {};
        field.title = "Edit"
        field.key = "edit"
        field.align = "center"
        field.width = 60
        field.render = (value) => {
            field.fixed = "right"
            return (
                <Space size="middle">
                    <Button type="primary" size={'small'} style={{backgroundColor: 'lightseagreen'}}
                            onClick={() => handleEdit(value)}>Edit</Button>

                </Space>

            )
        }
        if (operationConfig.disableEdit !== true) {
            fields.push(field)
        }
        return fields
    }
    const handleEdit = (value) => {
        setEditData(value)
        setIsEditModalOpen(true)
    }

    const onClickNoticeUsers = async () => {
        let result = await ajax("/common/wmsLocTail/notice", null, "p");
        if (result.code === 200) {
            message.success(result.msg)
        } else {
            message.error(result.msg)
        }
    }

    return (
        <div className={'normalTable'}>
            <AdvancedSearchForm/>
            <div className={'table-part'}>
                <div className={'operation'}>
                    <div className="operation-normal">
                        {
                            operationConfig.disableAdd === true ? (<div></div>) : (
                                <Button type="primary" size={'middle'} onClick={() => {
                                    setIsAddModalOpen(true)
                                }}>Add</Button>
                            )
                        }


                        {
                            operationConfig.disableDelete === true ? (<div></div>) : (
                                <Popconfirm
                                    title="Delete rows"
                                    description="Are you sure to delete the rows?"
                                    onConfirm={handleDelete}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger type="primary" size={'middle'}>Delete</Button>
                                </Popconfirm>
                            )
                        }

                        {
                            operationConfig.sendEmail !== true && operationConfig.sendEmail === undefined  ? (<div></div>) : (
                                <Tooltip title="Send all expired items to all users.">
                                    <Button type="primary" size={'middle'} onClick={onClickNoticeUsers}>Notice all user</Button>
                                </Tooltip>
                            )
                        }


                    </div>
                    <div className="operation-output" span={12}>

                        <Button size={"middle"} shape="circle" icon={<FileExcelOutlined/>}
                                onClick={exportExcel}/>
                    </div>
                </div>
                <Table
                    columns={getTableFields()}
                    dataSource={tableData}
                    className={'main-table'}
                    loading={loadingTableData}
                    size={"small"}
                    bordered={true}
                    pagination={{
                        hideOnSinglePage: true,
                        size: "default"
                    }}

                    rowSelection={{
                        fixed: true,
                        onChange: tableSelectChange,
                        selectedRowKeys: selectedKeys,
                    }}
                />
            </div>


            <AddModal isOpen={isAddModalOpen} changeOpen={() => setIsAddModalOpen(!isAddModalOpen)}
                      reloadTable={reloadTable} fields={operationConfig.field} prefixUrl={prefixUrl}/>
            {
                isEditModalOpen === false ? (<div></div>) : (
                    <EditModal isOpen={isEditModalOpen} changeOpen={() => setIsEditModalOpen(!isEditModalOpen)}
                               reloadTable={reloadTable} fields={operationConfig.field} data={editData}
                               prefixUrl={prefixUrl}/>)
            }

        </div>
    )
}
export default DynamicTable