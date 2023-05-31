import './login.css'
import {Button, message} from "antd";
import React, {useState} from "react";
import {reqLogin} from "../../api/login";
import {Navigate, useNavigate} from "react-router-dom";

export default () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    if (localStorage.getItem("username") !== null && localStorage.getItem("token") !== null){
        return <Navigate to={'/'}/>
    }

    //解决回调问题, 函数前面加上async
    const loginAction = async (element) => {
        if (username.length < 3 || password.length < 3) {
            messageApi.open({
                type: 'error',
                content: "Username and password's length must be more than three chars",
            })
            return;
        }
        // 所有返回promise的异步函数,前面需要加一个await
        const res = await reqLogin(username, password)
        if (res.code !== 200 ) {
            message.error(res.msg)
            return
        }
        localStorage.setItem("username",res.d.username)
        localStorage.setItem("token",res.d.token)
        message.success("welcome, " + res.d.nickname +".")
        navigate('/')
    }
    return (

        <div className={'login'}>
            {contextHolder}
            <div className="loginBox">
                <div className="content">
                    <p className="title">Warehouse Management System</p>
                    <br/>
                    <div className={'inputs'}>

                        <input type="text" placeholder={`username`}
                               onChange={element => setUsername(element.target.value)}/>
                        <input type="password" placeholder={'password'}
                               onChange={element => setPassword(element.target.value)}/>
                        <br/>
                        <Button type="primary" size={"large"} onClick={loginAction}>GO</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}