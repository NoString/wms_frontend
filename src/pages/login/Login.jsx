import './login.css'
import {Button, message} from "antd";
import {useState} from "react";

export default () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const loginAction = (element) => {
        if (username.length < 6 || password.length < 6) {
            messageApi.open({
                type: 'error',
                content: "Username and password's length must be more than six char",
            })
            return;
        }

    }
    return (

        <div className={'login'}>
            {contextHolder}
            <div className="loginBox">
                <div className="content">
                    <p className="title">Warehouse Management System</p>
                    <br/>
                    <div className={'inputs'}>

                        <input type="text" placeholder={`username`} onChange={element => setUsername(element.target.value)}/>
                        <input type="password" placeholder={'password'} onChange={element => setPassword(element.target.value)}/>
                        <br/>
                        <Button type="primary" size={"large"} onClick={loginAction}>GO</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}