import React, {Fragment} from "react";
import {Navigate, Route, Routes, useNavigate, useRoutes} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Content, Footer} from "antd/es/layout/layout";
import {Layout} from "antd";
import Nav from "../../components/nav/Nav";
import Header from "../../components/header/Header";
import {routingRoutes} from "../../config/routingRoutes";
import {homeRoutes} from "../../config/homeRoutes";
import Material from "./material/Material";
import Dashboard from "./dashboard/Dashboard";
import Chart from "./chart/Chart";

export default () => {
    if (localStorage.getItem("username") === null || localStorage.getItem("token") === null) {
        return <Navigate to={'/login'}/>
    }
    return (

        <Layout style={{height: "100%"}}>
            <Sider theme={'light'}>
                <Nav/>
            </Sider>
            <Layout>
                <Header/>
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