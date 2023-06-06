import React, {useRef, useState} from "react";
import './header.css'
import {Button, Divider, Dropdown, Select, Space, Tabs} from "antd";
import {
    CloseCircleOutlined, CloseOutlined,
    DownOutlined,
    FullscreenOutlined, HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RedoOutlined,
    SearchOutlined
} from "@ant-design/icons";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Icon from "antd/es/icon";

export default (props) => {
    let {collapsed, setCollapsed} = props;
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const location = useLocation()
    const navigate = useNavigate();
    const refresh = () => {
        navigate(location.pathname)
    }
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Profile
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Log out
                </a>
            ),
        },
    ]
    const initialItems = [
        {
            label: <HomeOutlined style={{marginLeft:'20%'}} />,
            key: 'home',
            closable: false
        },
        {
            label: 'Tab 2',
            key: '2',
        },
        {
            label: 'Tab 3',
            key: '3',
        },
    ];


    return (
        <div className={'header'}>
            <div className={'detail-bar'}>
                <div className="left-container">
                    <Button
                        onClick={toggleCollapsed}
                        size={"middle"}
                        className={'toggle-btn'}
                    >
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                </div>
                <div className="mid-container">
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                        ]}
                        className={'mid-select'}
                    />
                </div>
                <div className="right-container">
                    <Button size={"middle"} shape="circle" icon={<RedoOutlined/>} onClick={refresh}/>
                    <Button size={"middle"} shape="circle" icon={<FullscreenOutlined/>}/>
                    <Button size={"middle"} shape="circle" icon={<CloseOutlined />} placeholder={'close all without this page'}/>

                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {localStorage.getItem("nickname")}
                                <DownOutlined/>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
            <hr/>
            <div className={'tab-bar'}>
                <Tabs
                    type="editable-card"
                    items={initialItems}
                    hideAdd={true}
                    style={{borderRadius:'10px'}}
                    centered={true}
                />
            </div>
        </div>
    )
}