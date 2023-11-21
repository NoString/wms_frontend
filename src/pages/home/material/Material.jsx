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
                    name: "classifyName",
                    placeholder: "Classify Name"
                },
                {
                    name: "expiredDay",
                    placeholder: "Expired Day"
                },
                {
                    name: "createBy",
                    placeholder: "Create User"
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
                        message: 'Please input something!',
                        type: "string",
                        min: 4
                    }]

                },
                {
                    label: "Expired Day",
                    name: "expiredDay",
                    rules: [{
                        required: true,
                        message: 'Please input something!',
                        type: "number",
                    }]

                },{
                    label: "Weight",
                    name: "weight",
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

            },
            {
                title: 'Material Code',
                javaName: 'code',
                dbName: 'code',
            },
            {
                title: 'Classify Name',
                javaName: 'classifyName',
                dbName: 'classify_name',
            },
            {
                title: 'Expired Day',
                javaName: 'expiredDay',
                dbName: 'expired_day',
            },
            {
                title: 'Weight',
                javaName: 'weight',
                dbName: 'weight',
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
            },
        ]
    }



    return(
        <div className="normalTable">
            <DynamicTable config={config}/>
        </div>
    )
}