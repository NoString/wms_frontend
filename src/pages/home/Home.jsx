import React, {Fragment} from "react";
import {Navigate, useNavigate} from "react-router-dom";

export default () =>{
    if (localStorage.getItem("username") === null || localStorage.getItem("token") === null){
        return <Navigate to={'/login'}/>
    }

    return(
        <Fragment>
            <h2>Home组件</h2>
        </Fragment>
    )
}