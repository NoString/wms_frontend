import React from "react";
import './storeType.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";
export default () =>{


    let config = {
        prefixUrl: "/common/wmsLocType",
        //配置search栏
        searchConfig: {

            // 具体搜索栏内容
            searchField: [
                {
                    //name是传递给后台的key
                    name: "loc_type",
                    // 输入框展示的内容
                    placeholder: "Type Name",
                },
                {
                    name: "type_desc",
                    placeholder: "Type Description"
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
                title: 'Type Name',
                javaName: 'locType',
                dbName: 'loc_type',
                sort: "str"
            },
            {
                title: 'Type Description',
                javaName: 'typeDesc',
                dbName: 'type_desc',
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