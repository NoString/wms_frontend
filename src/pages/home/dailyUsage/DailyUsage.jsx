import React, {useEffect, useState} from "react";
import './dailyUsage.css'
import {Row} from "antd";
import ReactECharts from "echarts-for-react";
import ajax from "../../../api/ajax";
export default () =>{

    const [locHeads, setLocHeads] = useState({})
    const [tailSts, setTailSts] = useState({});

    const getLocHeads = async () => {
        let template = {
            title: {
                text: 'Location Status statistics'
            },
            tooltip: {},

            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: 'Data:',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        let result = await ajax("/common/wmsLocHead/groupBySts",null, "g");
        template.xAxis.data = result.d.name
        template.series[0].data = result.d.count
        setLocHeads(template)
    }
    const getTailSts = async () => {
        let template = {
            title: {
                text: 'Expiration Time statistics(Percentage)'
            },
            tooltip: {},

            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: 'Data:',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        let result = await ajax("/common/wmsLocTail/tailSts",null, "g");
        template.xAxis.data = result.d.name
        template.series[0].data = result.d.count
        setTailSts(template)
    }

    useEffect(() => {
        getLocHeads()
        getTailSts()
    }, []);
    return(
        <div className = {'dailyUsage'}>
            <div className={"top-part"}>
                <ReactECharts
                    option={locHeads}
                    opts={{ renderer: 'svg' }}
                />;
            </div>
            <div className="bottom-part">
                <ReactECharts
                    option={tailSts}
                    opts={{ renderer: 'svg' }}
                />;
            </div>
        </div>
    )
}