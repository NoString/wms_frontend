import axios from "axios";
import {message} from "antd";

export default (url, data={}, requestType='g') => {

    // 这样套一层promise的作用是拦截所有错误请求,然后通过pop弹窗提示
    return new Promise((resolve, reject) =>{
        let promise;

        if (requestType === 'g'){
            // 默认会把promise对象返回
            // 注意这里的第二个参数,对象里面设置params,然后params的参数是另一个对象
            promise =  axios.get( url,{
                params: data,
                headers:{
                    token: localStorage.getItem("token")
                }

            })
        }else {
            promise = axios.post( url,data,{
                headers:{
                    token: localStorage.getItem("token")
                }
            })
        }

        promise.then((response) =>{
            resolve(response.data)
        }).catch((err) =>{
            message.error(err.message);
        })
    } )

}