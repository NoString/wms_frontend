import React, {useEffect, useState} from "react";
import './DayInDetail.css'
import {Col, Divider, Row} from "antd";
import ReactECharts from 'echarts-for-react';
import ajax from "../../../api/ajax";
export default () =>{
    function formatDate(date) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    //获取最近7天
    function getRecentSevenDays() {
        const sevenDays = [];
        const today = new Date();

        for (let i = 6; i >= 0 ; i--) {
            const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            const formattedDate = formatDate(date);
            sevenDays.push(formattedDate);
        }

        return sevenDays;
    }


    const [bottomData, setBottomData] = useState({})
    const [leftPie, setLeftPie] = useState({})
    const [rightPie, setRightPie] = useState({})

    const getBottom = async () => {
        let areaChartDatas = {
            title: {
                text: 'The record of the nearest week'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['In']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : getRecentSevenDays()
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'In',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[0,0,0,0,0,0,0]
                }
            ]
        }
        let result = await ajax("/common/wmsTailInRecord/weekCount",null, "g");
        areaChartDatas.series[0].data = result.d
        setBottomData(areaChartDatas)
    }


    const getLeftPie = async () => {
        let leftData = {
            title : {
                text: 'Group by classify',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name: 'Data:',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        let result = await ajax("/common/wmsTailInRecord/classifyCount",null, "g");
        leftData.series[0].data = result.d
        setLeftPie(leftData)
    }

    const getRightPie = async () => {
        let Data = {
            title : {
                text: 'Group by User',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name: 'Data:',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        let result = await ajax("/common/wmsTailInRecord/userCount",null, "g");
        Data.series[0].data = result.d
        setRightPie(Data)
    }




    useEffect(() => {
        getBottom()
        getLeftPie()
        getRightPie()
    }, []);
    return(
        <div className = {'modifyRecord'}>

            <Row className={'top-part'}>
                <Col span={11}>
                    <ReactECharts
                        option={leftPie}
                    />
                </Col>
                <Col span={2}>
                    <Divider type="vertical" style={{height:"100%"}} />
                </Col>
                <Col span={11}>
                    <ReactECharts
                        option={rightPie}
                    />
                </Col>
            </Row>
            <Divider style={{width:"100%"}} />
            <Row className={'bottom-part'}>
                <Col span={24}>

                    <ReactECharts
                        option={bottomData}
                        className={'area-chart'}
                    />
                </Col>
            </Row>
        </div>
    )
}