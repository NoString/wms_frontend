import React from "react";
import './nav.css'
import navHeader from './img/navHeader.png'
import {NavLink} from "react-router-dom";
import {Menu} from "antd";
import {
    BarsOutlined,

    CopyOutlined, createFromIconfontCN,

    HomeOutlined,
    PieChartOutlined, PushpinOutlined, ToolOutlined, UserOutlined,
} from "@ant-design/icons";

export default () => {

    const Icons = createFromIconfontCN({
        scriptUrl:'//at.alicdn.com/t/c/font_4098391_ac4e7aliur.js'
    })

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem('Home', '1', <HomeOutlined/>,[
            getItem('Dashboard','2',<Icons type={'icon-dashboard'}/>),
            getItem('Chart','3',<Icons type={'icon-chart-bar'}/>),

            ]),

        getItem('Basic', '100', <CopyOutlined/>,[
            getItem('Material','101',<Icons type={'icon-material'}/>),
            getItem('Classify','102',<Icons type={'icon-fenlei'}/>),
            getItem('Store Status','103',<Icons type={'icon-flag'}/>),
            getItem('Store Type','104',<Icons type={'icon-type1'}/>),
        ]),

        getItem('Storage', '200', <PieChartOutlined/>,[
            getItem('Location','201',<Icons type={'icon-localtion'}/>),
            getItem('Detail','202',<Icons type={'icon-details'}/>),
            getItem('Detail Change','203',<Icons type={'icon-exchange'}/>),
            getItem('Statistic','204',<Icons type={'icon-Statistics'}/>),
        ]),

        getItem('Operation', '300',<ToolOutlined />,[
            getItem('Put In','301',<Icons type={'icon-in1157920easyiconnet'}/>),
            getItem('Move Out','302',<Icons type={'icon-outnet'}/>),
            getItem('Check','303',<Icons type={'icon-Statistics'}/>),
            getItem('Transfer','304',<Icons type={'icon-check'}/>),
        ]),

        getItem('Log', '400', <BarsOutlined />,[
            getItem('Storage Change','401'),
            getItem('Storage Time','402'),
            getItem('Day In/Out','403'),
            getItem('Day In Detail','404'),
            getItem('Day Out Detail','405'),
        ]),
        getItem('System', '500',<PushpinOutlined />,[
            getItem('Menu List','501'),
            getItem('Privilege','502'),
            getItem('Users','503'),
        ]),
        getItem('setting', '600', <UserOutlined />,[
            getItem('Profile','601'),
        ]),

    ];
    return (
        <div className={'nav'}>
            <NavLink to={'/'} className={'nav-header'}>
                <img src={navHeader} alt={''} style={{marginTop: "10px", padding: "10px"}}/>
            </NavLink>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                items={items}

            />
        </div>
    )
}