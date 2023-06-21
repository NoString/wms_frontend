import React from "react";
import {Button, Divider, Form, Input, message, Modal} from "antd";
import {reqEditRow} from "../../../api/table";


export default (props) => {

    const {isOpen, changeOpen, data, reloadTable, fields, prefixUrl} = props


    const [modalForm] = Form.useForm()
    const AdvancedModalForm = (key) => {
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
                        if (item.notInput === true) {
                            return (<Form.Item
                                label={item.label}
                                name={item.name}
                                rules={item.rule}
                                key={index + ''}
                            >
                                {
                                    item.code
                                }
                            </Form.Item>)
                        } else {
                            return (<Form.Item
                                label={item.label}
                                name={item.name}
                                rules={item.rule}
                                key={index + ''}

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