import React from "react";
import './users.css'
import DynamicTable from "../../../components/normalTable/DynamicTable";
import {Button, DatePicker, Select} from "antd";
import InputSelect from "../../../components/inputSelect/InputSelect";

export default () => {

    const {RangePicker} = DatePicker;

    const config = {
        prefixUrl: "/users",
        //配置search栏
        searchConfig: {
            // 是否开启全字段模糊搜索

            // 具体搜索栏内容
            searchField: [
                {
                    //name是传递给后台的key
                    name: "nickname",
                    // 输入框展示的内容
                    placeholder: "Nickname",
                    rule: [{
                        required: true,
                        message: "Please, choose a role"
                    }],
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
                    name: "last_login",
                    notInput: true,
                    code: (
                        <RangePicker/>
                    )
                },
                {
                    name: "role_id",
                    notInput: true,
                    code: (
                        <InputSelect url={"/role/query"} placeholder={"Role"} space={true}/>
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
                        type:"string",
                        min:3
                    }]
                },
                {
                    label: "Username",
                    name: "username",
                    rules: [{
                        required: true,
                        message: 'Please input your username!',
                        type:"string",
                        min:6
                    }]
                },{
                    label: "Email",
                    name: "email",
                    rules: [{
                        required: true,
                        message: 'Please input your email!',
                        type:"email"
                    }]
                },

                {
                    label: "Mobile",
                    name: "mobile",
                }
                , {
                    label: "Gender",
                    name: "gender",
                    notInput:true,
                    code:(
                        <Select

                            placeholder="gender"

                            options={[

                                {
                                    value: null,
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
                }
                ,
                {
                    label: "Role",
                    name: "roleId",
                    rules:[{
                        required: true,
                        message: 'Please choose the role!',
                    }],
                    notInput: true,
                    code: (
                        <InputSelect url={"/role/query"} placeholder={'Role'}/>
                    )
                }
                ,
                {
                    label: "Status",
                    name: "status",
                    rules:[{
                        required: true,
                        message: 'Please choose the status!',
                    }],
                    notInput: true,
                    code: (
                        <InputSelect url={"users/status/query"} placeholder={'Status'}/>
                    )
                }

            ],
            showAdd: true,
            showEdit: true,
            showDelete: true,
            showExport: true
        },
        tableFields : [
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
            },
            {
                title: 'Role',
                javaName: 'role',
                dbName: 'role',

            },
            {
                title: 'Action',
                key: 'action',
                actions: [
                    (<Button type="primary" size={'small'} style={{backgroundColor: 'lightseagreen'}}>Test</Button>)
                ]
            }

        ]
    }

    return (
        <div className={'users'}>
            <DynamicTable config={config}/>
        </div>
    )
}