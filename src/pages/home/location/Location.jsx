import React from "react";
import './location.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";

export default () =>{

    let config = {
        prefixUrl: "/common/wmsLocHead",
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
                    name: "loc_row",
                    placeholder: "Row",
                },{
                    name: "loc_bay",
                    placeholder: "Bay",
                },{
                    name: "loc_level",
                    placeholder: "Level",
                },{
                    name: "loc_sts",
                    placeholder: "Location Status",
                },{
                    name: "loc_type",
                    placeholder: "Location Type",
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
                title: 'Row',
                javaName: 'locRow',
                dbName: 'loc_row',
                sort: "num"
            },{
                title: 'Bay',
                javaName: 'locBay',
                dbName: 'loc_bay',
                sort: "num"
            },{
                title: 'Level',
                javaName: 'locLevel',
                dbName: 'loc_level',
                sort: "num"
            },{
                title: 'Location Status',
                javaName: 'locSts',
                dbName: 'loc_sts',
                sort: "str"
            },{
                title: 'Location Type',
                javaName: 'locType',
                dbName: 'loc_type',
                sort: "str"
            },

        ]
    }
    return(
        <div className = {'normalTable'}>
            <DynamicTable config={config}/>
        </div>
    )
}