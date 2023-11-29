import React, {useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {Content, Footer} from "antd/es/layout/layout";
import { Layout} from "antd";
import Nav from "../../components/nav/Nav";
import Header from "../../components/header/Header";
import './home.css'

import Material from "./material/Material";
import Dashboard from "./dashboard/Dashboard";
import Chart from "./chart/Chart";

import Classify from "./classify/Classify";
import StoreStatus from "./storeStatus/StoreStatus";
import StoreType from "./storeType/StoreType";
import Location from "./location/Location";
import Detail from "./detail/Detail";
import DetailModify from "./detailModify/DetailModify";
import Statistic from "./statistic/Statistic";
import PutIn from "./putIn/PutIn";
import MoveOut from "./moveOut/MoveOut";
import Check from "./check/Check";
import Transfer from "./transfer/Transfer";
import DailyUsage from "./dailyUsage/DailyUsage";
import DayInOut from "./dayInOut/DayInOut";
import DayOutDetail from "./dayOutDetail/DayOutDetail";
import MenuList from "./menuList/MenuList";
import Privilege from "./privilege/Privilege";
import Users from "./users/Users";
import Profile from "./profile/Profile";
import DayInDetail from "./dayInDetail/DayInDetail";

export default () => {
    if (localStorage.getItem("username") === null
        || localStorage.getItem("token") === null) {
        return <Navigate to={'/login'}/>
    }
    const [collapsed, setCollapsed] = useState(false);


    return (
        <Layout style={{height: "100%"}} className={'home'}>
            <Sider theme={'light'} collapsed={collapsed} style={{overflow:'overlay'}}>
                <Nav/>
            </Sider>
            <Layout>
                <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
                <div className={'layout-content'}>
                    <Routes>
                        {<Route path={'dashboard'} element={<Dashboard/>}/>}
                        {<Route path={'chart'} element={<Chart/>}/>}
                        {<Route path={'material'} element={<Material/>}/>}
                        {<Route path={'classify'} element={<Classify/>}/>}
                        {<Route path={'storeStatus'} element={<StoreStatus/>}/>}
                        {<Route path={'storeType'} element={<StoreType/>}/>}
                        {<Route path={'location'} element={<Location/>}/>}
                        {<Route path={'detail'} element={<Detail/>}/>}
                        {<Route path={'detailModify'} element={<DetailModify/>}/>}
                        {<Route path={'statistic'} element={<Statistic/>}/>}
                        {<Route path={'putIn'} element={<PutIn/>}/>}
                        {<Route path={'moveOut'} element={<MoveOut/>}/>}
                        {<Route path={'check'} element={<Check/>}/>}
                        {<Route path={'transfer'} element={<Transfer/>}/>}
                        {<Route path={'dailyUsage'} element={<DailyUsage/>}/>}
                        {<Route path={'dayInOut'} element={<DayInOut/>}/>}
                        {<Route path={'dayInDetail'} element={<DayInDetail/>}/>}
                        {<Route path={'dayOutDetail'} element={<DayOutDetail/>}/>}
                        {<Route path={'menuList'} element={<MenuList/>}/>}
                        {<Route path={'privilege'} element={<Privilege/>}/>}
                        {<Route path={'users'} element={<Users/>}/>}
                        {<Route path={'profile'} element={<Profile/>}/>}
                        {<Route path={'/'} element={<Navigate to={'/dashboard'}/>}/>}
                    </Routes>
                </div>
                <Footer className={'footer'}>

                        <p>
                            Create by zhs. Here is <a href="https://github.com/NoString/wms_frontend" target={'_blank'}>the front end</a> and <a href="https://github.com/NoString/wms_backend" target={'_blank'}>the back end</a>
                        </p>

                </Footer>
            </Layout>
        </Layout>

    )
}