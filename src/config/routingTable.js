/**
 * 路由表
 */
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";

export const routingTable = [
    {
        path: 'login',
        element: <Login/>
    },
    {
        path:'/',
        element: <Home/>
    },

]