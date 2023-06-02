import React, {useState} from "react";
import './header.css'
import {Button, Dropdown, Space} from "antd";
import {
    DownOutlined,
    FullscreenOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RedoOutlined,
    SearchOutlined
} from "@ant-design/icons";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
export default (props) =>{
    let {collapsed,setCollapsed} = props;
    const toggleCollapsed = () => {
      setCollapsed(!collapsed)
    }
    const location = useLocation ()
    const navigate = useNavigate();
    const refresh = () => {
        navigate(location.pathname)
    }
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


    return(
        <div className = {'header'}>
            <div className={'detail-bar'}>
                <Button
                    onClick={toggleCollapsed}
                    size={"middle"}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Button size={"middle"} shape="circle" icon={<RedoOutlined />} onClick={refresh}/>
                <Button size={"middle"} shape="circle" icon={<FullscreenOutlined />} />
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            {localStorage.getItem("nickname")}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>

            </div>
            <div className={'tab-bar'}>

            </div>
        </div>
    )
}