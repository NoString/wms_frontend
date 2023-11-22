import React, {useEffect} from "react";
import './material.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";
import {reqInputSelect} from "../../../api/inputSelect";
import {Select} from "antd";



export default () =>{


    let config = {
        prefixUrl: "/common/wmsMaterial",
        //配置search栏
        searchConfig: {

            // 具体搜索栏内容
            searchField: [
                {
                    //name是传递给后台的key
                    name: "name",
                    // 输入框展示的内容
                    placeholder: "Material Name",
                },
                {
                    name: "code",
                    placeholder: "Material Code"
                },
                {
                    name: "classify_name",
                    placeholder: "Classify Name"
                },
                {
                    name: "expired_day",
                    placeholder: "Expired Day"
                },
                {
                    name: "update_by",
                    placeholder: "Update User"
                }
            ]
        },
        operationConfig: {
            field: [
                {
                    label: "Material Name",
                    name: "name",
                    rules: [{
                        required: true,
                        message: 'Please input something!',
                        type: "string",
                        min: 4
                    }]
                },
                {
                    label: "Material Code",
                    name: "code",
                    rules: [{
                        required: true,
                        message: 'Please input something!',
                        type: "string",
                        min: 4
                    }]

                },
                {
                    label: "Classify Name",
                    name: "classifyName",
                    rules: [{
                        required: true,
                    }],
                    itemType: "select",
                    code: (
                        <Select
                            placeholder="Classify Name">
                            <Select.Option value={"Goods"}>Goods</Select.Option>
                            <Select.Option value={"Semi-finished product"}>Semi-finished product</Select.Option>
                            <Select.Option value={"Material"}>Material</Select.Option>
                        </Select>
                    )

                },
                {
                    label: "Expired Day",
                    name: "expiredDay",
                    rules: [{
                        required: true,
                    }],
                    itemType: "inputNumber",
                    min: 1

                },{
                    label: "Weight",
                    name: "weight",
                    itemType: "inputNumber",
                },{
                    label: "Color",
                    name: "color",
                },{
                    label: "Unit",
                    name: "unit",
                },
                {
                    label: "Memo",
                    name: "memo",
                },
            ],
        },
        tableFields: [

            {
                title: 'Material Name',
                javaName: 'name',
                dbName: 'name',
                sort: "str"

            },
            {
                title: 'Material Code',
                javaName: 'code',
                dbName: 'code',
                sort: "str"
            },
            {
                title: 'Classify Name',
                javaName: 'classifyName',
                dbName: 'classify_name',
                sort: "str"
            },
            {
                title: 'Expired Day',
                javaName: 'expiredDay',
                dbName: 'expired_day',
                sort: "num"
            },
            {
                title: 'Weight',
                javaName: 'weight',
                dbName: 'weight',
                sort: "num"
            },
            {
                title: 'Color',
                javaName: 'color',
                dbName: 'color',
            },
            {
                title: 'Unit',
                javaName: 'unit',
                dbName: 'unit',
            },
            {
                title: 'Memo',
                javaName: 'memo',
                dbName: 'memo',
            },{
                title: 'Update User',
                javaName: 'updateBy',
                dbName: 'update_by',
                sort: "str"
            },
        ]
    }



    return(
        <div className="normalTable">
            <DynamicTable config={config}/>
        </div>
    )
}