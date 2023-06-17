import React, {useEffect, useState} from "react";
import './inputSelect.css'
import {Select} from "antd";
import {reqInputSelect} from "../../api/inputSelect";

export default (props) => {
    const [data, setData] = useState([]);
    const {defaultValue} = props;
    const getData = async () => {
        let data = await reqInputSelect('/role/query');
        setData([{
            label: '',
            value: ''
        }, ...data.d])
        return data;
    }
    useEffect(() => {
        getData();
    }, []);

    return defaultValue === undefined ? (
        <Select
            options={data}
            onChange={props.onChange}
            placeholder={'role'}

        />
    ) : (
        <Select
            options={data}
            onChange={props.onChange}
            placeholder={'role'}
            defaultValue={props.defaultValue}
        />
    )
}