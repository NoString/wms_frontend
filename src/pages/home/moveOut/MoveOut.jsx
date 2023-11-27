import React, {useEffect, useRef, useState} from "react";
import './moveOut.css'
import {Button, Col, Input, message, Modal, Progress, Row, Space, Table, Tooltip} from "antd";
import ajax from "../../../api/ajax";
import {FileExcelOutlined, SearchOutlined} from "@ant-design/icons";
import * as PropTypes from "prop-types";
import ExportJsonExcel from "js-export-excel";

function Highlighter(props) {
    return null;
}

Highlighter.propTypes = {
    searchWords: PropTypes.arrayOf(PropTypes.string),
    autoEscape: PropTypes.bool,
    textToHighlight: PropTypes.any,
    highlightStyle: PropTypes.shape({padding: PropTypes.number, backgroundColor: PropTypes.string})
};
export default () =>{

    const ExportJsonExcel = require("js-export-excel");
    let pathName = window.location.pathname.split('/')[1]

    //左边table库存数据
    const [leftTableDatas, setLeftTableDatas] = useState([])
    //右边table待出库数据
    const [rightTableDatas, setRightTableDatas] = useState([]);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);




    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => {
        return ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => text
    })};

    //左去右
    const onClickMove = (value) => {
        let newLeftTableDatas = leftTableDatas.filter(item => item.key !== value.key)
        setLeftTableDatas(newLeftTableDatas)
        setRightTableDatas([...rightTableDatas,value])
    }
    //左去右,所有快要过期的
    const onClickExpired = (value) => {
        let newLeftTableDatas = leftTableDatas.filter(item => item.progress >= 20)
        let newRightTableDatas = leftTableDatas.filter(item => item.progress < 20)
        setLeftTableDatas(newLeftTableDatas)
        setRightTableDatas([...rightTableDatas,...newRightTableDatas])
    }
    //右去左
    const onClickRollBack = (value) => {
      let newRightTableDatas = rightTableDatas.filter(item => item.key !== value.key)
        setRightTableDatas(newRightTableDatas)
        setLeftTableDatas([...leftTableDatas,value])
    }


    const tableField = [
        {
            title: 'Location Number',
            dataIndex: 'locNo',
            key: 'loc_no',
            ...getColumnSearchProps('locNo'),
        },{
            title: 'Material Name',
            dataIndex: 'name',
            key: 'm_name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Amount',
            dataIndex: 'qty',
            key: 'qty',
            sort: "num",
            sorter: (a, b, c) => a['qty'] - b['qty']
        },
        {
            title: 'Expired Progress',
            key: 'progress',
            dataIndex: 'progress',
            sorter: (a, b, c) => a['progress'] - b['progress'],
            render: (value) => {
                let color
                let status = null
                if (value >= 90) {
                    color = "#52c41a";
                }else if (value < 90 && value >= 20){
                    //default color
                }else if (value < 20 && value >= 1){
                    color = "red";
                }else {
                    color = "red";
                    status="exception"
                }
                return (
                    <Progress percent={value}
                              size={[200,10]}
                              strokeColor={color}
                              status={status}
                    />
                )
            }
        },
        {
            title: 'Expired Date',
            dataIndex: 'expiredDate$',
            key: 'm_expired_date',
            sorter: (a, b, c) => {
                let preDate = new Date(a['expiredDate$'.split("$")[0]])
                let nextDate = new Date(b['expiredDate$'.split("$")[0]])

                return preDate - nextDate
            }
        },
        {
            title: 'Action',
            key: 'moveTo',
            render: value => {
                return(
                    <Button
                        type="primary" size={'small'}
                        style={{backgroundColor: 'lightseagreen'}}
                        onClick={() => onClickMove(value)}
                    >
                        Move
                    </Button>
                )
            }
        }
    ]

    const rightTableFields = [
        {
            title: 'Location Number',
            dataIndex: 'locNo',
            key: 'loc_no',
        },{
            title: 'Material Name',
            dataIndex: 'name',
            key: 'm_name',
        },
        {
            title: 'Amount',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Action',
            key: 'rollback',
            render: value => {
                return(
                    <Button
                        type="primary" size={'small'}
                        style={{backgroundColor: 'lightseagreen'}}
                        onClick={() =>onClickRollBack(value)}
                    >
                        Rollback
                    </Button>
                )
            }
        },
    ]
    //Excel导出函数
    const exportExcel = () => {
        let excelColumns = []
        let sheetData = []
        let fields = tableField;
        for (let i = 0; i < fields.length; i++) {
            excelColumns.push(fields[i].dataIndex)
        }
        if (rightTableDatas === null || rightTableDatas === undefined || rightTableDatas.length <= 0){
            message.error("Please, export the data after add something.")
            return;
        }
        rightTableDatas.map((obj) => {
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

    //提交出库
    const onClickSubmit = async (excel) => {
        setShowSubmitModal(!showSubmitModal)
        if (rightTableDatas.length <= 0) {
            message.error("Please, choose data first.")
            return
        }
        if (excel) {
            exportExcel()
        }
        let result = await ajax("/work/moveOut", rightTableDatas, "p");
        if (result.code === 200) {
            message.success(result.msg)
            setRightTableDatas([])
        } else {
            message.error(result.msg)
        }
    }


    const getLeftTableDatas = async () => {
        const data = await ajax("/common/wmsLocTail/list", null, "g")
        setLeftTableDatas(data.d)
    }
    useEffect(() => {
        getLeftTableDatas()
    }, []);

    return(
        <div className = {'normalTable'}>
            <Row style={{height:"100%"}}>
                <Col span={15} className={'left-row'}>
                    <Row style={{marginTop: '5px'}}>
                        <Col>
                            <Tooltip title="Choose all near expired items.(Less than 20 percent.)">
                                <Button type="primary" size={'middle'}
                                        style={{backgroundColor: 'red'}}
                                        onClick={onClickExpired}
                                >
                                    Expired items
                                </Button>
                            </Tooltip>

                        </Col>
                    </Row>
                    <Table
                        columns={tableField}
                        dataSource={leftTableDatas}
                        bordered={true}
                        pagination={{
                            pageSize: 9,
                            simple: true
                        }}
                        className={'left-table'}
                    />
                </Col>
                <Col span={8} className={'right-row'} offset={1}>
                    <Row style={{marginTop: '5px'}}>
                        <Col>
                            <Button type="primary" size={'middle'}
                                    onClick={() => setShowSubmitModal(!showSubmitModal)}
                            >
                                Submit
                            </Button>
                            <Modal title="Notice"
                                   open={showSubmitModal}
                                   onCancel={() => setShowSubmitModal(!showSubmitModal)}
                                   keyboard={true}
                                   footer={[
                                       <Button
                                       type={'primary'}
                                       onClick={() => onClickSubmit(true)}
                                       >
                                           Yes, export.
                                       </Button>,
                                       <Button
                                       type={'primary'}
                                       style={{backgroundColor: 'lightseagreen'}}
                                       onClick={() => onClickSubmit(false)}
                                       >
                                           No, submit it without export.
                                       </Button>,
                                   ]}
                            >
                                <p>Do you want to export excel?</p>
                            </Modal>
                        </Col>
                    </Row>
                    <Table
                        className={'right-table'}
                        columns={rightTableFields}
                        dataSource={rightTableDatas}
                        bordered={true}
                        pagination={{
                            pageSize: 9,
                            simple: true
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}