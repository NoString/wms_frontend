import React, {useState} from "react";
import {Button, Divider, Form, Input, InputNumber, message, Modal} from "antd";
import {reqEditRow} from "../../../api/table";



export default (props) => {

    const {isOpen, changeOpen, data, reloadTable, fields, prefixUrl} = props

    const [modalForm] = Form.useForm()
    const changeNumber = (item1, item2, item3) => {
        console.log(item1);
        console.log(item2);
        console.log(item3);
    }


    const AdvancedModalForm =  (key) => {
        return (
            <div key={key}>
                <Form.Item
                label={'Id'}
                name={'id'}
                style={{display:"none"}}
                >
                    <Input/>
                </Form.Item>
                {
                    fields.map((item, index) => {

                        switch (item.itemType) {
                            case "select":
                                return (
                                    <Form.Item
                                        label={item.label}
                                        name={item.name}
                                        key={index + ''}
                                        rules={item.rules}
                                    >
                                        {item.code}
                                    </Form.Item>
                                )
                            case "inputNumber":
                                return (<Form.Item
                                    label={item.label}
                                    name={item.name}
                                    key={index + ''}
                                    rules={item.rules}
                                >
                                    <InputNumber min={item.min} max={item.max} />
                                </Form.Item>)
                            default:
                                return (<Form.Item
                                    label={item.label}
                                    name={item.name}
                                    key={index + ''}
                                    rules={item.rules}
                                >
                                    <Input/>
                                </Form.Item>)
                        }
                    })
                }

            </div>

        )
    }


    const modalClose = () => {
        changeOpen()
    }

    const modalSubmit = async (data) => {
        let result = await reqEditRow(data, prefixUrl+"/edit")
        if (result.code === 200) {
            message.success(result.msg)

        } else {
            message.error(result.msg)
        }
        reloadTable()
        changeOpen()
    }


    const modalButtons = [
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
                initialValues={data}
            >
                <Divider orientation={"left"}>Add {window.location.pathname.split('/')[1]}</Divider>
                {
                    AdvancedModalForm()
                }
            </Form>
        </Modal>
    )
}