import React, {useState} from 'react';

import {Anchor, Button, Col, Drawer,Row} from 'antd';
import {MenuUnfoldOutlined} from '@ant-design/icons';
import Showlogo from "../images/showlogo-blanco.png";
import {NavLink} from "react-router-dom";
const { Link } = Anchor;
function MainMenu() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div className="container-fluid">
            <div className="header">
                <div className="logo">
                    <a href="http://google.com"><img src={Showlogo} alt="logo" className="imagenlogo" /> </a>
                </div>
                <div className="mobileHidden">
                    <Anchor targetOffset="65">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">Nosotros</NavLink>
                        <NavLink to="/event">Eventos</NavLink>
                        <NavLink to="/ingresar">Ingresar</NavLink>
                        <NavLink to="/contact" >Contactos</NavLink>
                    </Anchor>

                </div>
                <div className="mobileVisible">
                    <Button type="primary" onClick={showDrawer}>
                        <MenuUnfoldOutlined />
                    </Button>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Anchor targetOffset="65">
                            <NavLink to="/" >Home</NavLink>
                            <NavLink to="/about" >Nosotros</NavLink>
                            <NavLink to="/event" >Eventos</NavLink>
                            <NavLink to="/ingresar">Ingresar</NavLink>
                            <NavLink to="/contact">Contactos</NavLink>
                        </Anchor>
                    </Drawer>
                </div>
            </div>
        </div>
    );
}

export default MainMenu;