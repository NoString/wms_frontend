import React, {useRef, useState} from "react";
import {Button, Carousel, Divider, Form, Input, message, Modal, Pagination} from "antd";
import {reqAddRows} from "../../../api/table";

export default (props) => {
    const {isOpen,changeOpen,reloadTable,fields,prefixUrl} = props

    const [modalFormCurrent, setModalFormCurrent] = useState(1);
    const [modalFormCount, setModalFormCount] = useState(1);
    const carouselRef = useRef();
    const [modalForm] = Form.useForm()


    const AdvancedModalForm = (key) => {
        return (
            <div key={key}>
                {
                    fields.map((item,index) =>{
                        return item.notInput === true ? (
                            <Form.Item
                                label={item.label}
                                name={item.name + "-" + key}
                                key={index}
                                rules={item.rules}
                            >
                                {item.code}
                            </Form.Item>
                        ) : (
                            <Form.Item
                                label={item.label}
                                name={item.name + "-" + key}
                                key={index}
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

    const [modalFormContentPages, setModalFormContentPages] = useState([AdvancedModalForm( '0')]);



    const modalFormIndexChange = (page, pageSize) => {
        setModalFormCurrent(page)
        carouselRef.current.goTo(page - 1);
    }
    const modalMore = async () => {
        if (modalFormCount >= 10) {
            message.error('The pages can not be more than TEN !')
            return;
        }
        let nowCurrent = modalFormCount + 1;

        await setModalFormContentPages([...modalFormContentPages, AdvancedModalForm(modalFormCount + '')])
        setModalFormCount(nowCurrent)
        setModalFormCurrent(nowCurrent)
        carouselRef.current.goTo(nowCurrent - 1);
    }

    const modalClose = () => {
        setModalFormContentPages([AdvancedModalForm( '0')])
        setModalFormCount(1)
        setModalFormCurrent(1)

        changeOpen()
    }

    const modalSubmit = async (data) => {
        let parseData = []
        for (let i = 1; i <= modalFormCount; i++) {
            parseData.push({})
        }
        for (let dataKey in data) {
            let splitData = dataKey.split("-");
            let splitKey = splitData[0]
            let index = splitData[1]
            parseData[index][splitKey] = data[dataKey]
        }

        let result = await reqAddRows(parseData,prefixUrl+"/add")
        if (result.code === 200) {
            message.success(result.msg)

        }else {
            message.error(result.msg)
        }
        reloadTable()
        changeOpen()
    }

    const handleDotChange = (current) => {
        setModalFormCurrent(current + 1)
    }
    const modalButtons = [
        <Pagination
            key={'pagination'}
            simple
            defaultCurrent={1}
            defaultPageSize={1}
            current={modalFormCurrent}
            total={modalFormCount}
            size={"small"}
            style={{paddingBottom: "20px"}}
            hideOnSinglePage={true}
            onChange={modalFormIndexChange}
        />,
        <Button key="more"
                size={"middle"}
                onClick={modalMore}
                type={"primary"}
                style={{backgroundColor: 'lightseagreen'}}
        >
            More
        </Button>,
        <Button key="save"
                size={"middle"}
                type={"primary"}
                onClick={() => {
                    modalForm.submit()
                }}

        >

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
            >
                <Divider orientation={"left"}>Add {window.location.pathname.split('/')[1]}</Divider>

                <Carousel dots={false} ref={carouselRef}
                          afterChange={handleDotChange}
                >
                    {modalFormContentPages.map((item) => {

                        return (item)
                    })}
                </Carousel>
            </Form>
        </Modal>
    )
}