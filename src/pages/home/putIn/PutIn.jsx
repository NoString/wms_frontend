import React, {useEffect, useState} from "react";
import './putIn.css'
import {AutoComplete, Button, Card, Col, Row, Table, Tooltip} from "antd";
import {CloseSquareFilled} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";

export default () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',

        },
        {
            title: 'Action',
            key: 'action',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];


    const [options, setOptions] = useState([{
        label: 1,
        value: 1
    },
        {
            label: 11,
            value: 11
        },
        {
            label: 111,
            value: 111
        }])

    return (
        <div className={'normalTable'}>
            <Row style={{height: "100%"}}>
                <Col span={8} className={"left-input"}>
                    <Card
                        title="Stock Operation"
                        bordered={false}
                        className={"card"}
                    >


                        <Title level={5}>Location Number:</Title>
                        <Tooltip title="Which postion do you want to put the goods?">
                            <AutoComplete
                                placeholder="Location Number"
                                options={options}
                                allowClear={{
                                    clearIcon: <CloseSquareFilled/>,
                                }}
                                style={{width: "100%"}}
                                filterOption={true}
                            />
                        </Tooltip>

                        <Title level={5}>Material Name:</Title>
                        <Tooltip title="Which Material Do you want to put in?">
                            <AutoComplete
                                placeholder="Material Name"
                                allowClear={{
                                    clearIcon: <CloseSquareFilled/>,
                                }}
                                style={{width: "100%"}}
                                filterOption={true}
                            />
                        </Tooltip>
                        <Title level={5}>Amount:</Title>
                        <Tooltip title="How many do you want to put in?">
                            <AutoComplete
                                placeholder="Customized clear icon"
                                allowClear={{
                                    clearIcon: <CloseSquareFilled/>,
                                }}
                                style={{width: "100%"}}
                                filterOption={true}
                            />
                        </Tooltip>
                        <br/>
                        <div className={"add-button"}>
                            <Button type="primary">Add</Button>
                        </div>


                    </Card>

                </Col>
                <Col span={16}>
                    <div className="rightInput">
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Col>
            </Row>


        </div>
    )
}