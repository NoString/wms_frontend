import React, {useEffect, useRef, useState} from "react";
import {Button, Carousel, Divider, Form, Input, message, Modal, Pagination, Select} from "antd";
import {reqEditRow, reqEditRows} from "../../../api/table";


export default (props) => {

    const {isOpen,changeOpen,data,reloadTable,fields} = props


    const [modalForm] = Form.useForm()
    const AdvancedModalForm = (key) => {
        console.log(fields);
        return (
            <div key={key}>
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
                                    item.code()
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

        let result = await reqEditRow(data,"/users/edit")
        if (result.code === 200) {
            message.success(result.msg)

        }else {
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