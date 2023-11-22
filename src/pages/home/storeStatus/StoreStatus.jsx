import React from "react";
import './storeStatus.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";
import {Select} from "antd";
export default () =>{
    let config = {
        prefixUrl: "/common/wmsLocSts",
        //配置search栏
        searchConfig: {

            // 具体搜索栏内容
            searchField: [
                {
                    //name是传递给后台的key
                    name: "loc_sts",
                    // 输入框展示的内容
                    placeholder: "Status Name",
                },
                {
                    name: "loc_desc",
                    placeholder: "Status Description"
                }
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
                title: 'Id',
                javaName: 'id',
                dbName: 'id',
            },
            {
                title: 'Status Name',
                javaName: 'locSts',
                dbName: 'loc_sts',
                sort: "str"
            },
            {
                title: 'Status Description',
                javaName: 'locDesc',
                dbName: 'loc_desc',
                sort: "str"
            }
        ]
    }

    return(
        <div className = {'normalTable'}>
            <DynamicTable config={config}/>
        </div>
    )
}