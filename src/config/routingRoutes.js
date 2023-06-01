/**
 * 路由表
 */
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Dashboard from "../pages/home/dashboard/Dashboard";
import Chart from "../pages/home/chart/Chart";
import Material from "../pages/home/material/Material";
import {Navigate} from "react-router-dom";

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
        ]

    }

]