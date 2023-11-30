import React, {useState} from "react";
import './nav.css'
import navHeader from './img/navHeader.png'
import {NavLink} from "react-router-dom";
import {Button, Menu} from "antd";
import {
    BarsOutlined,

    CopyOutlined, createFromIconfontCN,

    HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
    PieChartOutlined, PushpinOutlined, ToolOutlined, UserOutlined,
} from "@ant-design/icons";

export default () => {
    let defaultOpen, defaultSelect, pathName = window.location.pathname.split('/')[1]
    const dynamicSelectNav = () => {
        var flag = false
        items.forEach((item) =>{
            item.children.forEach((childrenItem) =>{
                if (childrenItem.label.props.to === pathName){
                    defaultSelect = childrenItem.key + ''
                    defaultOpen = item.key + ''
                    flag = true
                }
            })
        });
        if (!flag){
            defaultOpen = '1'
            defaultSelect = '2'
        }

    }
    const Icons = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/c/font_4098391_6tv0rmavj9r.js'
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
        getItem('Home', '1', <HomeOutlined/>, [
            getItem(<NavLink to={'dashboard'}>Dashboard</NavLink>, '2', <Icons type={'icon-dashboard'}/>),
            // getItem(<NavLink to={'chart'}>Chart</NavLink>, '3', <Icons type={'icon-chart-bar'}/>),

        ]),

        getItem('Basic', '100', <CopyOutlined/>, [
            getItem(<NavLink to={'material'}>Material</NavLink>, '101', <Icons type={'icon-material'}/>),
            getItem(<NavLink to={'classify'}>Classify</NavLink>, '102', <Icons type={'icon-fenlei'}/>),
            getItem(<NavLink to={'storeStatus'}>Store Status</NavLink>, '103', <Icons type={'icon-flag'}/>),
            getItem(<NavLink to={'storeType'}>Store Type</NavLink>, '104', <Icons type={'icon-type1'}/>),
        ]),

        getItem('Storage', '200', <PieChartOutlined/>, [
            getItem(<NavLink to={'location'}>Location</NavLink>, '201', <Icons type={'icon-localtion'}/>),
            getItem(<NavLink to={'detail'}>Detail</NavLink>, '202', <Icons type={'icon-details'}/>),
            // getItem(<NavLink to={'detailModify'}>Detail Modify</NavLink>, '203', <Icons type={'icon-exchange'}/>),
            // getItem(<NavLink to={'statistic'}>Statistic</NavLink>, '204', <Icons type={'icon-Statistics'}/>),
        ]),

        getItem('Operation', '300', <ToolOutlined/>, [
            getItem(<NavLink to={'putIn'}>Put In</NavLink>, '301', <Icons type={'icon-in1157920easyiconnet'}/>),
            getItem(<NavLink to={'moveOut'}>Move Out</NavLink>, '302', <Icons type={'icon-outnet'}/>),
            // getItem(<NavLink to={'check'}>Check</NavLink>, '303', <Icons type={'icon-Statistics'}/>),
            // getItem(<NavLink to={'transfer'}>Transfer</NavLink>, '304', <Icons type={'icon-check'}/>),
        ]),

        getItem('Log', '400', <BarsOutlined/>, [
            getItem(<NavLink to={'dayInDetail'}>Day In Detail</NavLink>, '404', <Icons type={'icon-rizhi'}/>),
            getItem(<NavLink to={'dayOutDetail'}>Day Out Detail</NavLink>, '405', <Icons type={'icon-rizhi'}/>),
            getItem(<NavLink to={'dailyUsage'}>Inventory</NavLink>, '402', <Icons type={'icon-rizhi'}/>),
            // getItem(<NavLink to={'dayInOut'}>Day In/Out</NavLink>, '403', <Icons type={'icon-rizhi'}/>),

        ]),
        getItem('System', '500', <PushpinOutlined/>, [
            // getItem(<NavLink to={'menuList'}>Menu List</NavLink>, '501', <Icons type={'icon-menu'}/>),
            // getItem(<NavLink to={'privilege'}>Privilege</NavLink>, '502', <Icons type={'icon-privilege'}/>),
            getItem(<NavLink to={'users'}>Users</NavLink>, '503', <Icons type={'icon-User-List'}/>),
        ]),
        // getItem('Setting', '600', <UserOutlined/>, [
        //     getItem(<NavLink to={'profile'}>Profile</NavLink>, '601', <Icons type={'icon-bu-profile-o'}/>),
        // ]),

    ];
    dynamicSelectNav();

    const [openKeys, setOpenKeys] = useState([defaultOpen]);
    const rootSubmenuKeys = ['1', '100', '200', '300', '400', '500', '600'];
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }

    };

    return (
        <div className={'nav'}>

            <NavLink to={'/'} className={'nav-header'}>
                <img src={navHeader} alt={''} style={{marginTop: "10px", padding: "10px"}}/>
            </NavLink>
            <Menu
                defaultSelectedKeys={[defaultSelect]}
                defaultOpenKeys={[defaultOpen]}
                mode="inline"
                theme="light"
                items={items}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
            />

        </div>
    )
}