import React, {Fragment, useState} from "react";
import {Navigate, NavLink, Route, Routes, useNavigate, useRoutes} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Content, Footer} from "antd/es/layout/layout";
import {Button, Layout, Menu} from "antd";
import Nav from "../../components/nav/Nav";
import Header from "../../components/header/Header";
import {routingRoutes} from "../../config/routingRoutes";
import {homeRoutes} from "../../config/homeRoutes";
import Material from "./material/Material";
import Dashboard from "./dashboard/Dashboard";
import Chart from "./chart/Chart";
import {
    BarsOutlined,
    CopyOutlined,
    createFromIconfontCN,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, PieChartOutlined, PushpinOutlined, ToolOutlined, UserOutlined
} from "@ant-design/icons";
import navHeader from "../../components/nav/img/navHeader.png";

export default () => {
    if (localStorage.getItem("username") === null || localStorage.getItem("token") === null) {
        return <Navigate to={'/login'}/>
    }
    const [collapsed, setCollapsed] = useState(false);


    return (
        <Layout style={{height: "100%"}}>
            <Sider theme={'light'} collapsed={collapsed}>
                <Nav />
            </Sider>
            <Layout>
                <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Content>
                    <Routes>
                        {<Route path={'dashboard'} element={<Dashboard/>}/>}
                        {<Route path={'chart'} element={<Chart/>}/>}
                        {<Route path={'material'} element={<Material/>}/>}
                        {<Route path={'/'} element={<Navigate to={'/dashboard'}/>}/>}
                    </Routes>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>

    )
}