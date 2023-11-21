import React, {useRef, useState} from "react";
import {Button, Carousel, Divider, Form, Input, message, Modal, Pagination} from "antd";
import {reqAddRows} from "../../../api/table";

export default (props) => {
    const {isOpen,changeOpen,reloadTable,fields,prefixUrl} = props

    const [modalForm] = Form.useForm()


    const AdvancedModalForm = (key) => {
        return (
            <div key={key}>
                {
                    fields.map((item,index) =>{
                        return item.notInput === true ? (
                            <Form.Item
                                label={item.label}
                                name={item.name}
                                key={index + ''}
                                rules={item.rules}
                            >
                                {item.code}
                            </Form.Item>
                        ) : (
                            <Form.Item
                                label={item.label}
                                name={item.name}
                                key={index + ''}
                                rules={item.rules}
                            >
                                <Input/>
                            </Form.Item>
                        )
                    })
                }

            </div>

        )
    }

    const modalSubmit = async (data) => {

        let result = await reqAddRows(data,prefixUrl+"/add")
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
        </Button>
    ]

    return (
        <Modal
            open={isOpen}
            footer={modalButtons}
            onCancel={() =>changeOpen()}
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
                name="addModal"
                labelAlign={'right'}
                form={modalForm}
                onFinish={modalSubmit}
                preserve={false}
            >
                <Divider orientation={"left"}>Add {window.location.pathname.split('/')[1]}</Divider>

                <AdvancedModalForm/>
            </Form>
        </Modal>
    )
}