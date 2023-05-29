import logo from './logo.svg';
import './App.css';
import {BrowserRouter, useRoutes} from "react-router-dom";
import {Fragment} from "react";
import {routingTable} from "./config/routingTable";

function App() {
    let routes = useRoutes(routingTable);
    return (
        <Fragment>
            {routes}
        </Fragment>
    );
}

export default App;
