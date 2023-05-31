import React, {Fragment} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Content, Footer} from "antd/es/layout/layout";
import {Layout} from "antd";
import Nav from "../../components/nav/Nav";
import Header from "../../components/header/Header";

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
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>

    )
}