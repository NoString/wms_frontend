import React from "react";
import './nav.css'
import navHeader from './img/navHeader.png'
import {NavLink} from "react-router-dom";
import {Menu} from "antd";
import {
    BarsOutlined,

    CopyOutlined,

    HomeOutlined,
    PieChartOutlined, PushpinOutlined, ToolOutlined, UserOutlined,
} from "@ant-design/icons";

export default () => {
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem('Home', 'home', <HomeOutlined/>,[
            getItem('Control','control'),
            getItem('Analyze','analyze'),

            ]),
        getItem('Basic', 'basic', <CopyOutlined/>,[
            getItem('Material','material'),
        ]),
        getItem('Storage', 'storage', <PieChartOutlined/>),
        getItem('Operation', 'operation',<ToolOutlined />),

        getItem('Log', 'log', <BarsOutlined />),
        getItem('System', 'system',<PushpinOutlined />),
        getItem('setting', 'setting', <UserOutlined />),

    ];
    return (
        <div className={'nav'}>
            <NavLink to={'/'} className={'nav-header'}>
                <img src={navHeader} alt={''} style={{marginTop: "10px", padding: "10px"}}/>
            </NavLink>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                items={items}

            />
        </div>
    )
}