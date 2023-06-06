/**
 * 路由表
 */
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Dashboard from "../pages/home/dashboard/Dashboard";
import Chart from "../pages/home/chart/Chart";
import Material from "../pages/home/material/Material";
import Classify from "../pages/home/classify/Classify";
import StoreStatus from "../pages/home/storeStatus/StoreStatus";
import StoreType from "../pages/home/storeType/StoreType";
import Location from "../pages/home/location/Location";
import Detail from "../pages/home/detail/Detail";
import DetailModify from "../pages/home/detailModify/DetailModify";
import Statistic from "../pages/home/statistic/Statistic";
import PutIn from "../pages/home/putIn/PutIn";
import MoveOut from "../pages/home/moveOut/MoveOut";
import Check from "../pages/home/check/Check";
import Transfer from "../pages/home/transfer/Transfer";
import ModifyRecord from "../pages/home/modifyRecord/ModifyRecord";
import DailyUsage from "../pages/home/dailyUsage/DailyUsage";
import DayInOut from "../pages/home/dayInOut/DayInOut";
import DayInDetail from "../pages/home/dayInDetail/DayInDetail";
import DayOutDetail from "../pages/home/dayOutDetail/DayOutDetail";
import MenuList from "../pages/home/menuList/MenuList";
import Privilege from "../pages/home/privilege/Privilege";
import Users from "../pages/home/users/Users";
import Profile from "../pages/home/profile/Profile";

export const routingRoutes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path:'/',
        element: <Home/>,
        children: [

            {
                path:'dashboard',
                element: <Dashboard/>
            },
            {
                path:'chart',
                element: <Chart/>
            },
            {
                path:'material',
                element: <Material/>
            },
            {
                path: 'classify',
                element: <Classify/>
            },
            {
                path: 'storeStatus',
                element: <StoreStatus/>
            },
            {
                path: 'storeType',
                element: <StoreType/>
            },
            {
                path: 'location',
                element: <Location/>
            },
            {
                path: 'detail',
                element: <Detail/>
            },
            {
                path: 'detailModify',
                element: <DetailModify/>
            },
            {
                path: 'statistic',
                element: <Statistic/>
            },
            {
                path: 'putIn',
                element: <PutIn/>
            },
            {
                path: 'moveOut',
                element: <MoveOut/>
            },
            {
                path: 'check',
                element: <Check/>
            },
            {
                path: 'transfer',
                element: <Transfer/>
            },
            {
                path: 'modifyRecord',
                element: <ModifyRecord/>
            },
            {
                path: 'dailyUsage',
                element: <DailyUsage/>
            },
            {
                path: 'dayInOut',
                element: <DayInOut/>
            },
            {
                path: 'dayInDetail',
                element: <DayInDetail/>
            },
            {
                path: 'dayOutDetail',
                element: <DayOutDetail/>
            },
            {
                path: 'menuList',
                element: <MenuList/>
            },
            {
                path: 'privilege',
                element: <Privilege/>
            },
            {
                path: 'users',
                element: <Users/>
            },
            {
                path: 'profile',
                element: <Profile/>
            }

        ]

    }

]