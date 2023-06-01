import Dashboard from "../pages/home/dashboard/Dashboard";
import Chart from "../pages/home/chart/Chart";
import Material from "../pages/home/material/Material";

export const homeRoutes = [
    {
        path:'/home/dashboard',
        element: <Dashboard/>
    },
    {
        path:'/home/chart',
        element: <Chart/>
    },
    {
        path:'/home/material',
        element: <Material/>
    },
]