import React from "react";
import './classify.css'
import {Select} from "antd";
import InputSelect from "../../../components/inputSelect/InputSelect";
import DynamicTable from "../../../components/normalTable/DynamicTable";

export default () => {
    const config = {
        prefixUrl: "/classify",
        //配置search栏
        searchConfig: {

            // 具体搜索栏内容
            searchField: [
                {
                    //name是传递给后台的key
                    name: "name",
                    // 输入框展示的内容
                    placeholder: "Category Name",
                },
                {
                    name: "memo",
                    placeholder: "Memo"
                }
            ]
        },
        operationConfig: {
            field: [
                {
                    label: "Category Name",
                    name: "name",
                    rules: [{
                        required: true,
                        message: 'Please input your category Name!',
                        type: "string",
                        min: 3
                    }]
                },
                {
                    label: "Memo",
                    name: "memo",

                },
            ],
        },
        tableFields: [
            {
                title: 'Id',
                javaName: 'id',
                dbName: 'id',

            },
            {
                title: 'Category Name',
                javaName: 'name',
                dbName: 'name',

            },
            {
                title: 'Memo',
                javaName: 'memo',
                dbName: 'memo',
            },
            {
                title: 'Create time',
                javaName: 'createTime$',
                dbName: 'create_time',
                sort: "date"
            },
            {
                title: 'Create by',
                javaName: 'createBy$',
                dbName: 'create_by',
                sort: "str"

            },
            {
                title: 'Update time',
                javaName: 'updateTime$',
                dbName: 'update_time',
                sort: "date"

            },
            {
                title: 'Update by',
                javaName: 'updateBy$',
                dbName: 'update_by',
                sort: "str"

            },


        ]
    }
    return (
        <div className={'classify'}>
            <DynamicTable config={config}/>
        </div>
    )
}