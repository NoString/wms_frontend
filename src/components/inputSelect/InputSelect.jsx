import React, {useEffect, useRef, useState} from "react";
import './inputSelect.css'
import {Select} from "antd";
import {reqInputSelect} from "../../api/inputSelect";

export default (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {url, placeholder} = props;
    const getData = async () => {
        let data = await reqInputSelect(url);
        setData([{
            label: '',
            value: ''
        }, ...data.d])
        setIsLoading(false)
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <Select
            options={data}
            onChange={props.onChange}
            placeholder={placeholder}
            loading={isLoading}

        />
    )
}