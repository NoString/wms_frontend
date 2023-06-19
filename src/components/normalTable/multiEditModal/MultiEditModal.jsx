import React, {useEffect, useRef, useState} from "react";
import {Button, Carousel, Divider, Form, Input, message, Modal, Pagination, Select} from "antd";
import InputSelect from "../../inputSelect/InputSelect";
import {reqAddRows} from "../../../api/table";
import useForceUpdate from "antd/es/_util/hooks/useForceUpdate";

export default (props) => {
    let parseData = {};
    const {isOpen,changeOpen,datas,reloadTable} = props
    let count = datas.length
    datas.map((data,index) =>{
        for (let dataKey in data) {
            parseData[dataKey + "-" + index] = data[dataKey]
        }
    })
    const [modalFormCurrent, setModalFormCurrent] = useState(1);

    const carouselRef = useRef();
    const [modalForm] = Form.useForm()

    const AdvancedModalForm = (key) => {
        return (
            <div key={key}>

                {/*确保form提交时包含ID字段*/}
                <Form.Item
                    label="id"
                    name={"id-" + key}
                    style={{display:"none"}}
                >
                    <Input/>
                </Form.Item>


                <Form.Item
                    label="Nickname"
                    name={"nickname-" + key}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                        },
                    ]}
                >
                    <Input/>


                </Form.Item>

                <Form.Item
                    label="Username"
                    name={"username-" + key}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>

                </Form.Item>

                <Form.Item
                    label="Mobile"
                    name={"mobile-" + key}
                >
                    <Input/>
                </Form.Item>


                <Form.Item
                    label="Password"
                    name={"password-" + key}

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input/>

                </Form.Item>


                <Form.Item
                    name={`gender-` + key}
                    label={'Gender'}
                >
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
                </Form.Item>



                <Form.Item
                    name={"roleId-" + key}
                    label={'role'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your role!',
                        },
                    ]}
                >
                    <InputSelect/>
                </Form.Item>

            </div>

        )
    }




    const modalFormIndexChange = (page, pageSize) => {
        setModalFormCurrent(page)
        carouselRef.current.goTo(page - 1);
    }


    const modalClose = () => {
        parseData = {}

        changeOpen()
    }

    const modalSubmit = async (data) => {
        let parseData = []
        for (let i = 1; i <= count; i++) {
            parseData.push({})
        }
        for (let dataKey in data) {
            let splitData = dataKey.split("-");
            let splitKey = splitData[0]
            let index = splitData[1]
            parseData[index][splitKey] = data[dataKey]
        }

        let result = await reqAddRows(parseData,"/users/edit")
        if (result.code === 200) {
            message.success(result.msg)

        }else {
            message.error(result.msg)
        }
        reloadTable()
        changeOpen()
    }


    const modalButtons = [
        <Pagination
            key={'pagination'}
            simple
            defaultCurrent={1}
            defaultPageSize={1}
            current={modalFormCurrent}
            total={count}
            size={"small"}
            style={{paddingBottom: "20px"}}
            hideOnSinglePage={true}
            onChange={modalFormIndexChange}
        />,
        <Button key="save"
                size={"middle"}
                type={"primary"}
                onClick={() => {
                    modalForm.submit()
                }}>
            Save
        </Button>,
    ]

    return (
        <Modal
            open={isOpen}
            footer={modalButtons}
            onCancel={modalClose}
            maskClosable={false}
            destroyOnClose={true}
        >
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                name="mutilAddModal"
                labelAlign={'right'}
                form={modalForm}
                onFinish={modalSubmit}
                preserve={false}
                initialValues={parseData}
            >
                <Divider orientation={"left"}>Add {window.location.pathname.split('/')[1]}</Divider>

                <Carousel dots={false} ref={carouselRef}>
                    {
                        datas.map((_,index) =>{
                            return AdvancedModalForm(index)
                        })
                    }

                </Carousel>
            </Form>
        </Modal>
    )
}