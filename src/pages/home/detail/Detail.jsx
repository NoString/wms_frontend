import React from "react";
import './detail.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";
import {Select} from "antd";
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
                javaName: 'mName',
                dbName: 'm_name',
                sort: "str"
            },{
                title: 'Material Code',
                javaName: 'mCode',
                dbName: 'm_code',
                sort: "str"
            },{
                title: 'Classify Name',
                javaName: 'mClassifyName',
                dbName: 'm_classify_name',
                sort: "str"
            },{
                title: 'Expired Day',
                javaName: 'mExpiredDay',
                dbName: 'm_expired_day',
                sort: "date"
            },{
                title: 'Update Time',
                javaName: 'updateTime',
                dbName: 'update_time',
                sort: "date"
            },{
                title: 'Update User',
                javaName: 'updateBy',
                dbName: 'update_by',
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