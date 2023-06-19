import React, {useEffect, useRef, useState} from "react";
import './inputSelect.css'
import {Select} from "antd";
import {reqInputSelect} from "../../api/inputSelect";

export default (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {value} = props;
    const getData = async () => {
        let data = await reqInputSelect('/role/query');
        setData([{
            label: '',
            value: ''
        }, ...data.d])
        console.log(data);
        setIsLoading(false)
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <Select
            options={data}
            onChange={props.onChange}
            placeholder={'role'}
            defaultValue={value}
            loading={isLoading}
        />
    )
}