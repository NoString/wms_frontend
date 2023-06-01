import logo from './logo.svg';
import './App.css';
import {BrowserRouter, useRoutes} from "react-router-dom";
import {Fragment} from "react";
import {routingRoutes} from "./config/routingRoutes";

function App() {
    let routes = useRoutes(routingRoutes);
    return (
        <Fragment>
            {routes}
        </Fragment>
    );
}

export default App;
