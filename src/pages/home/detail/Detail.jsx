import React from "react";
import './detail.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";
import {Progress, Select} from "antd";
import Title from "antd/lib/typography/Title";
export default () =>{

    let config = {
        prefixUrl: "/common/wmsLocTail",
        //配置search栏
        searchConfig: {
            // 具体搜索栏内容
            searchField: [
                {
                    //name是传递给后台的key
                    name: "loc_no",
                    // 输入框展示的内容
                    placeholder: "Location Number",
                },{
                    name: "m_name",
                    placeholder: "Material Name",
                },{
                    name: "m_code",
                    placeholder: "Material Code",
                },{
                    name: "m_classify_name",
                    placeholder: "Classify Name",
                },{
                    name: "m_expired_day",
                    placeholder: "Before expired Day",
                },{
                    name: "update_by",
                    placeholder: "Update User",
                },

            ]
        },
        operationConfig: {
            disableAdd: true,
            disableEdit: true,
            disableDelete: true,
            field: [

            ],
        },
        tableFields: [
            {
                title: 'Location Number',
                javaName: 'locNo',
                dbName: 'loc_no',
                sort: "num"
            },{
                title: 'Material Name',
                javaName: 'name',
                dbName: 'm_name',
                sort: "str"
            },{
                title: 'Material Code',
                javaName: 'code',
                dbName: 'm_code',
                sort: "str"
            },{
                title: 'Classify Name',
                javaName: 'classifyName',
                dbName: 'm_classify_name',
                sort: "str"
            },
            {
                title: 'Amount',
                javaName: 'qty',
                dbName: 'qty',
                sort: "num"
            },
            {
                title: 'Expired Progress',
                dbName: 'progress',
                javaName: 'progress',
                sort:"num",
                render: (value) => {
                    let color
                    let status = null
                    if (value.progress >= 90) {
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
                        <Progress percent={value.progress}
                                  size={[200,10]}
                                  strokeColor={color}
                                  status={status}
                        />
                    )
                }
            },
            {
                title: 'Expired Date',
                javaName: 'expiredDate$',
                dbName: 'm_expired_date',
                sort: "date"
            },{
                title: 'Create Date',
                javaName: 'createTime$',
                dbName: 'create_time',
                sort: "date"
            },{
                title: 'Create User',
                javaName: 'createBy',
                dbName: 'create_by',
                sort: "date"
            },

        ]
    }

    return(
        <div className = {'normalTable'}>
            <DynamicTable config={config}/>
        </div>
    )
}