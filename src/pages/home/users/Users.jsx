import React from "react";
import './users.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";
import {DatePicker, Select} from "antd";
import InputSelect from "../../../components/inputSelect/InputSelect";
export default () =>{

    const {RangePicker} = DatePicker;

    const config = {
        //配置search栏
        searchConfig: {
            // 是否开启全字段模糊搜索
            all: true,
            // 具体搜索栏内容
            searchField: [
                {
                    //name是传递给后台的key
                    name: "nickname",
                    // 输入框展示的内容
                    placeholder: "Nickname"
                },
                {
                    name: "username",
                    placeholder: "Username"
                },
                {
                    name: "gender",
                    // 表示非普通input组件
                    notInput: true,
                    /**
                     *  表示自定义code,  code外面用 Col和form.item包裹
                     *  <Col span={6} key={'3'}>
                     *    <Form.Item
                     *      name={`gender`}
                     *     >
                     *  </Form.Item>
                     */
                    code: (
                        <Select
                            placeholder="gender"
                            options={[
                                {
                                    value: null,
                                    label: null
                                },
                                {
                                    value: false,
                                    label: 'Female',
                                }, {
                                    value: true,
                                    label: 'Male',
                                },

                            ]}
                        />
                    )
                },
                {
                    name:"last_login",
                    notInput: true,
                    code: (
                        <RangePicker/>
                    )
                },
                {
                    name:"role_id",
                    notInput: true,
                    code: (
                        <InputSelect url={"/role/query"}/>
                    )
                }

            ]
        },
    }

    return(
        <div className = {'users'}>
            <DynamicTable config={config}/>
        </div>
    )
}