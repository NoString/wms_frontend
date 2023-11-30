import React from "react";
import './dashboard.css'
import {Card, Col, Row,  Typography} from "antd";
import Meta from "antd/es/card/Meta";
import inImg from './img/in.png'
import outImg from './img/out.png'
import analysis from './img/analysis.png'
import {useNavigate} from "react-router-dom";

const {Text } = Typography;
export default () =>{

    let navigate = useNavigate();
    const moveToIn = () => {
        navigate('/putIn', { replace: true });
    }
    const moveToOut = () => {
        navigate('/moveOut', { replace: true });
    }
    const moveToUser = () => {
        navigate('/users', { replace: true });
    }
    return(
        <div className = {'dashboard'}>
            <div className={'header'}>
                <Card
                    title="What is the WMS?"
                    style={{
                        width: "70%",
                        marginTop: "2%"
                    }}
                >
                    <Text>A Warehouse Management System (WMS) is a key part of the supply chain and primarily aims to control the movement and storage of materials within a warehouse and process the associated transactions, including shipping, receiving, put-away, and picking.</Text>
                    <br/>
                    <Text>As a branch system of WMS, this system has developed specific functions specifically for the frozen food industry, such as the food expiration reminder function and the function of conveniently clearing expired food.</Text>
                </Card>
            </div>
           <Row className={'row'}>
              <Col span={4} offset={3} className={'col'}>
                  <Card
                      hoverable
                      style={{
                          width: 240,
                      }}
                      cover={<img alt="example" src={inImg}/>}
                      onClick={moveToIn}
                  >
                      <Meta title="Put In" description="in-stockroom operation" />
                  </Card>
              </Col>
               <Col span={4} offset={3} className={'col'}>
                   <Card
                       hoverable
                       style={{
                           width: 240,
                       }}
                       cover={<img alt="example" src={outImg} />}
                       onClick={moveToOut}
                   >
                       <Meta title="Move out" description="Outbound operation" />
                   </Card>
               </Col>

               <Col span={4} offset={3} className={'col'}>
                   <Card
                       hoverable
                       style={{
                           width: 240,
                       }}
                       cover={<img alt="example" src={analysis} />}
                       onClick={moveToUser}
                   >
                       <Meta title="User" description="User operation" />
                   </Card>
               </Col>
           </Row>
        </div>
    )
}