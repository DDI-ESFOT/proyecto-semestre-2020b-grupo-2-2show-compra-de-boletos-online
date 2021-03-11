import React from 'react';
import { Carousel } from 'antd';
import { Card, Col, Row } from 'antd';
import '../Styles/Home.css';
import Showlogo from "../images/Showlogo.png";

function onChange(a, b, c) {
    console.log(a, b, c);
}
const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: '#364d79',
};

function Home (props){
    return(
        <>
            <div className="container" >
                <Carousel afterChange={onChange}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>

            <h1>Lo que tiene 2Show para ti</h1>
            <div className="container" >
                <div className="site-card-wrapper">
                    <Row gutter={30}>
                        <Col xs={24} sm={12} lg={8}>
                            <img src={Showlogo} alt="logo" className="imagencard"/>
                            <Card title="Shows en Vivo" bordered={false}>
                                Card contentnj fdjsfnsdf jdnsfjdsnfks jfnsdkjfn dskfjnsdkf
                                jdsnfkjdsfnkdj sfnjfsfdsf
                                fggsbsdfgsd sdsdsdsdsdsdsdsds dsdsdsdsdsds dsdsdsdsdsds
                                dsdsdsdsdsds dsdsdsddfdsf
                                fgfdsgfffffff ffffffffffff ffffffffff fffff ffff fffffffff
                                fffffff ffdgsdfd
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <img src={Showlogo} alt="logo" className="imagencard"/>
                            <Card title="Conoce a tus Artistas Preferidos" bordered={false}>
                                Card contentnj fdjsfnsdf jdnsfjdsnfks jfnsdkjfn dskfjnsdkf
                                jdsnfkjdsfnkdj sfnjfsfdsf
                                fggsbsdfgsd sdsdsdsds dsdsdsds dsdsdsdsdsds dsdsdsdsdsds
                                dsdsdsdsdsds dsdsdsddfdsf
                                fgfdsgfffffff ffffffffffff ffffffffff fffff ffff fffffffff
                                fffffff ffdgsdfd
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <img src={Showlogo} alt="logo" className="imagencard"/>
                            <Card title="Compra entradas pra eventos" bordered={false}>
                                Card contentnj fdjsfnsdf jdnsfjdsnfks jfnsdkjfn dskfjnsdkf
                                jdsnfkjdsfnkdj sfnjfsfdsf
                                fggsbsdfgsd sdsdsdsds dsdsdsds dsdsdsdsdsds dsdsdsdsdsds
                                dsdsdsdsdsds dsdsdsddfdsf
                                fgfdsgfffffff ffffffffffff ffffffffff fffff ffff fffffffff
                                fffffff ffdgsdfd
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>
            <h1>¿Cómo funciona 2Show para ti?</h1>
            <div className="container" >

            </div>




        </>

    );
}
export default Home;