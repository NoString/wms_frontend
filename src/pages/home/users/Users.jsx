import React from "react";
import './users.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";
import {Button, DatePicker, Select} from "antd";
import InputSelect from "../../../components/inputSelect/InputSelect";

export default () => {

    const {RangePicker} = DatePicker;

    const config = {
        prefixUrl: "/user",
        //配置search栏
        searchConfig: {
            // 是否开启全字段模糊搜索

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
                                    value: '',
                                    label: ''
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
                    name: "last_login",
                    notInput: true,
                    code: (
                        <RangePicker/>
                    )
                }

            ]
        },
        operationConfig: {
            field: [


                {
                    label: "Nickname",
                    name: "nickname",
                    rules: [{
                        required: true,
                        message: 'Please input your nickname!',
                        type: "string",
                        min: 4
                    }]
                },
                {
                    label: "Username",
                    name: "username",
                    rules: [{
                        required: true,
                        message: 'Please input your username!',
                        type: "string",
                        min: 4
                    }]
                },
                {
                    label: "Password",
                    name: "password",
                    rules: [{
                        required: true,
                        message: 'Please input your password!',
                        type: "string",
                        min: 4
                    }]
                },
                {
                    label: "Email",
                    name: "email",
                    rules: [{
                        required: true,
                        message: 'Please input your email!',
                        type: "email"
                    }]
                }
                , {
                    label: "Gender",
                    name: "gender",
                    rules: [{
                        required: true
                    }],
                    notInput: true,
                    code: (
                        <Select
                            placeholder="gender">
                            <Select.Option value={true}>Male</Select.Option>
                            <Select.Option value={false}>Female</Select.Option>
                        </Select>

                    )
                }
                , {
                    label: "Status",
                    name: "status",
                    rules: [{
                        required: true
                    }],
                    notInput: true,
                    code: (
                        <Select
                            placeholder="Status">
                            <Select.Option value={true}>Available</Select.Option>
                            <Select.Option value={false}>Unavailable</Select.Option>
                        </Select>
                    )
                }

            ],
        },
        tableFields: [
            {
                title: 'Nickname',
                javaName: 'nickname',
                dbName: 'nickname',
                sort: "str"
            },
            {
                title: 'Username',
                javaName: 'username',
                dbName: 'username',

            },
            {
                title: 'Mobile',
                javaName: 'mobile',
                dbName: 'center',
            },
            {
                title: 'Password',
                javaName: 'password',
                dbName: 'password',
                sort: "num"


            },
            {
                title: 'Gender',
                javaName: 'gender$',
                dbName: 'gender',

            },
            {
                title: 'Last Login',
                javaName: 'lastLogin$',
                dbName: 'last_login',
                sort: "date"
            }

        ]
    }

    return (
        <div className={'users'}>
            <DynamicTable config={config}/>
        </div>
    )
}