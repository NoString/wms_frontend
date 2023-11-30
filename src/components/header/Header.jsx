import React, {useRef, useState} from "react";
import './header.css'
import {Button, Divider, Dropdown, message, Select, Space, Tabs} from "antd";
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
    const navigate = useNavigate();
    const refresh = () => {
        window.location.reload();
    }


    const items = [

        {
            key: 'logout',
            label: 'Log out',
        },
    ]

    let isFullscreen = false;
    function toggleFullscreen() {
        if (!isFullscreen) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    }
    function enterFullscreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // 兼容 Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // 兼容 Chrome、Safari 和 Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // 兼容 IE/Edge
            document.documentElement.msRequestFullscreen();
        }
        isFullscreen = true;
    }

    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // 兼容 Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // 兼容 Chrome、Safari 和 Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // 兼容 IE/Edge
            document.msExitFullscreen();
        }
        isFullscreen = false;
    }

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
                    {/*<Select*/}
                    {/*    showSearch*/}
                    {/*    placeholder="Select a person"*/}
                    {/*    optionFilterProp="children"*/}
                    {/*    onChange={onChange}*/}
                    {/*    onSearch={onSearch}*/}
                    {/*    filterOption={(input, option) =>*/}
                    {/*        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())*/}
                    {/*    }*/}
                    {/*    options={[*/}
                    {/*        {*/}
                    {/*            value: 'jack',*/}
                    {/*            label: 'Jack',*/}
                    {/*        },*/}
                    {/*        {*/}
                    {/*            value: 'lucy',*/}
                    {/*            label: 'Lucy',*/}
                    {/*        },*/}
                    {/*        {*/}
                    {/*            value: 'tom',*/}
                    {/*            label: 'Tom',*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*    className={'mid-select'}*/}
                    {/*/>*/}
                </div>
                <div className="right-container">
                    <Button size={"middle"} shape="circle" icon={<RedoOutlined/>} onClick={refresh}/>
                    <Button size={"middle"} shape="circle" icon={<FullscreenOutlined/>} onClick={toggleFullscreen}/>
                    {/*<Button size={"middle"} shape="circle" icon={<CloseOutlined />} placeholder={'close all without this page'}/>*/}

                    <Dropdown
                        menu={{
                            items,
                            onClick : ({key}) => {
                                switch (key) {
                                    case 'logout':
                                        // If user click the Log-out Button, clear all local data, then return the login page
                                        localStorage.clear()
                                        navigate('/login')
                                        message.success("Log out successfully")
                                        break
                                }
                            }
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
                {/*<Tabs*/}
                {/*    type="editable-card"*/}
                {/*    items={initialItems}*/}
                {/*    hideAdd={true}*/}
                {/*    style={{borderRadius:'10px'}}*/}
                {/*    centered={true}*/}
                {/*/>*/}
            </div>
        </div>
    )
}