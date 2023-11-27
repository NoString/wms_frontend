import React, {useEffect, useState} from "react";
import './putIn.css'
import {AutoComplete, Button, Card, Col, Input, InputNumber, message, Popover, Row, Table, Tooltip} from "antd";
import {CloseSquareFilled, FileExcelOutlined} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import exportExcel from "js-export-excel/src/js-export-excel";
import {reqInputSelect} from "../../../api/inputSelect";
import ajax from "../../../api/ajax";
import ExportJsonExcel from "js-export-excel";

export default () => {
    /**
     *
     field.title = value.title
     field.dataIndex = value.javaName
     field.key = value.dbName
     */

    const tableColumns = [
        {
            title: 'Amount',
            key: 'qty',
            dataIndex: 'qty',
            align: 'center',
            render: text => (<p style={{color:"red"}}>{text}</p>)
        },
        {
            title: 'Location Number',
            dataIndex: 'locNo',
            key: 'loc_no',
            align: 'center',
        },
        {
            title: 'Material Name',
            dataIndex: 'name',
            key: 'm_name',
            align: 'center',
        },
        {
            title: 'Material Code',
            dataIndex: 'code',
            key: 'm_code',
            align: 'center',
        },
        {
            title: 'Material Id',
            dataIndex: 'materialId',
            key: 'm_id',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            render: (value, record) => (
                <Button danger type="primary" size={'small'} onClick={()=>deleteRow(value)}>Delete</Button>
            ),
        }

    ];

    //Excel导出
    const ExportJsonExcel = require("js-export-excel");
    let pathName = window.location.pathname.split('/')[1]

    //所有可用的库位
    const [locOptions, setLocOptions] = useState([])
    //所有可用的物料
    const [materialNames, setMaterialNames] = useState([]);
    //Input物料代码
    const [materialCode, setMaterialCode] = useState()
    //Input物料名称
    const [materialName, setMaterialName] = useState()
    //Input库位号
    const [loc, setLoc] = useState();
    //Input数量
    const [amount, setAmount] = useState(1);
    //Input物料ID
    const [materialId, setMaterialId] = useState();
    //所有待添加的物料
    const [tableDatas, setTableDatas] = useState([]);

    const getLocOptionsData = async () => {
        const data = await ajax("/common/wmsLocHead/query/available", null, "g")
        setLocOptions(data.d)
    }
    const getMaterialNamesData = async () => {
        const data = await ajax("/common/wmsMaterial/materialNames/query", null, "g")
        setMaterialNames(data.d)
    }
    const getSingleMaterialCodeData = async (id) => {
        let data = await ajax("/common/wmsMaterial/id", {id}, "g");
        setMaterialCode(data.d.code)
        setMaterialId(data.d.id)
    }
    useEffect(() => {
        getLocOptionsData()
        getMaterialNamesData()
    }, []);


    //当物料名称改变后的回调,同时修改输入框的物料代码
    const changeMaterialCode = (value, data) => {

        if (data === undefined || Object.keys(data).length === 0) {
            setMaterialCode(null)
        } else {
            getSingleMaterialCodeData(data.id)
            setMaterialName(value)
        }
    }

    //点击Add按钮,把数据添加到表格
    const addData = () => {
        if (loc === null || loc === undefined) {
            message.error("Please, choose the location number.")
            return
        }
        if (materialName === null || materialName === undefined) {
            message.error("Please, choose the material.")
            return
        }
        if (amount === null || amount === undefined) {
            message.error("Please, type the amount.")
            return
        }
        let currentData = {
            key : tableDatas.length + 1,
            locNo : loc,
            name : materialName,
            code : materialCode,
            materialId : materialId,
            qty : amount
        }
        setTableDatas([...tableDatas,currentData])
    }

    //点击Submit按钮,提交数据到后台
    const submitData = async () =>{
        if (tableDatas === undefined || tableDatas === null || tableDatas.length <= 0) {
            message.error("Please, add data first.")
            return
        }
        let result = await ajax("/work/putin", tableDatas, "p");
        if (result.code === 200) {
            message.success(result.msg)
            setTableDatas(null)
            setMaterialCode(null)
            setMaterialName(null)
            setLoc(null)
            setAmount(null)
            setMaterialId(null)
        } else {
            message.error(result.msg)
        }
    }

    //Excel导出函数
    const exportExcel = () => {
        let excelColumns = []
        let sheetData = []
        let fields = tableColumns;
        for (let i = 0; i < fields.length; i++) {
            excelColumns.push(fields[i].dataIndex)
        }
        if (tableDatas === null || tableDatas === undefined || tableDatas.length <= 0){
            message.error("Please, export the data after add something.")
            return;
        }
        tableDatas.map((obj) => {
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

    //删除row
    const deleteRow = (target) => {
        let newTableDatas = tableDatas.filter(tableData => tableData.key !== target.key)
        setTableDatas(newTableDatas)
    }

    return (
        <div className={'normalTable'}>
            <Row style={{height: "100%"}}>
                <Col span={8} className={"left-input"}>
                    <Card
                        title="Stock Operation"
                        bordered={false}
                        className={"card"}
                    >


                        <Title level={5}>Location Number:</Title>
                        <Tooltip title="Which postion do you want to put the goods?">
                            <AutoComplete
                                placeholder="Location Number"
                                options={locOptions}
                                allowClear={{
                                    clearIcon: <CloseSquareFilled/>,
                                }}
                                style={{width: "100%"}}
                                filterOption={true}
                                value={loc}
                                onChange={(value) => setLoc(value)}
                            />
                        </Tooltip>

                        <Title level={5}>Material Name:</Title>
                        <Tooltip title="Choose a material by name.">
                            <AutoComplete
                                placeholder="Material Name"
                                options={materialNames}
                                allowClear={{
                                    clearIcon: <CloseSquareFilled/>,
                                }}
                                style={{width: "100%"}}
                                filterOption={true}
                                onChange={changeMaterialCode}
                                value={materialName}
                                onClear={() => {
                                    setMaterialName(null)
                                    setMaterialCode(null)
                                    setMaterialId(null)
                                }}


                            />
                        </Tooltip>
                        <Title level={5}>Material Code:</Title>
                        <Input
                            disabled={true}
                            placeholder={"Material Code"}
                            value={materialCode}
                            style={{color:"red"}}>
                        </Input>

                        <Title level={5}>Material Id:</Title>
                        <Input
                            disabled={true}
                            placeholder={"Material Id"}
                            value={materialId}
                            style={{color:"red"}}>
                        </Input>


                        <Title level={5}>Amount:</Title>
                        <Tooltip title="How many do you want to put in?">
                            <InputNumber
                                placeholder="Amount"
                                style={{width: "100%"}}
                                min={1}
                                defaultValue={1}
                            value={amount}
                            onChange={(value) => setAmount(value)}
                            />

                        </Tooltip>
                        <br/>
                        <div className={"add-button"}>
                            <Button type="primary" onClick={addData}>Add</Button>
                        </div>


                    </Card>

                </Col>
                <Col span={16}>
                    <div className="rightInput">
                        <Row style={{marginTop: '5px'}}>
                            <Col span={2}>
                                <Button type="primary" size={'middle'}
                                        style={{backgroundColor: 'lightseagreen'}}
                                    onClick={submitData}
                                >Submit</Button>

                            </Col>
                            <Col span={2} offset={20}>
                                <div className="operation-output">

                                    <Button size={"middle"} shape="circle" icon={<FileExcelOutlined/>}
                                            onClick={exportExcel}/>
                                </div>
                            </Col>
                        </Row>
                        <Table
                            columns={tableColumns}
                            dataSource={tableDatas}
                            bordered={true}
                            className={'table-part'}
                            rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
                            pagination={{
                                pageSize: 9,
                                simple: true
                            }}
                        />
                    </div>
                </Col>
            </Row>


        </div>
    )
}