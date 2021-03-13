import React, {useState} from 'react';

import {Anchor, Button, Drawer} from 'antd';
import {MenuUnfoldOutlined} from '@ant-design/icons';
import Showlogo from "../images/showlogo-blanco.png";

const { Link } = Anchor;

function ShowHeader() {
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
                    <a href="http://google.com"><img src={Showlogo} alt="logo" className="imagenlogo"/> </a>
                </div>
                <div className="mobileHidden">
                    <Anchor targetOffset="65">
                        <Link to="/" title="Home"/>
                        <Link to="/about" title="Nosotros"/>
                        <Link to="/event" title="Eventos"/>
                        <Link to="/ingresar" title="Ingresar"/>
                        <Link to="/contact" title="Contactos"/>
                    </Anchor>
                </div>
                <div className="mobileVisible">
                    <Button type="primary" onClick={showDrawer}>
                        <MenuUnfoldOutlined/>
                    </Button>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Anchor targetOffset="65">
                            <Link to="/" title="Home"/>
                            <Link to="/about" title="Nosotros"/>
                            <Link to="/event" title="Eventos"/>
                            <Link to="/ingresar" title="Ingresar"/>
                            <Link to="/contact" title="Contactos"/>
                        </Anchor>
                    </Drawer>
                </div>
            </div>
        </div>
    );
}
export default ShowHeader;